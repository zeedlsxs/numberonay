import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  checkRateLimit,
  detectSuspiciousActivity,
  validateCardNumber,
} from "@/lib/security";
import { getIyzicoService } from "@/lib/iyzico";
import { sendTelegramNotification } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: "Giriş yapmalısınız." }, { status: 401 });
    }

    const body = await request.json();
    const { amount, currency = "TRY", card } = body;
    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount < 1000) {
      return NextResponse.json(
        { success: false, error: "Minimum yükleme tutarı 10 TL." },
        { status: 400 },
      );
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = checkRateLimit(ip, 5, 60000);

    if (!rateLimitResult.allowed) {
      await sendTelegramNotification({
        type: "suspicious_activity",
        userId: session.id,
        timestamp: new Date().toISOString(),
        details: {
          ip,
          reason: "Rate limit exceeded",
          resetTime: rateLimitResult.resetTime,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: "Çok fazla istek. Lütfen birkaç dakika sonra tekrar deneyin.",
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 },
      );
    }

    if (card?.cardNumber && !validateCardNumber(card.cardNumber)) {
      return NextResponse.json({ success: false, error: "Geçersiz kart numarası" }, { status: 400 });
    }

    const suspiciousActivity = detectSuspiciousActivity(session.id, ip, 0, 60000);
    if (suspiciousActivity.isSuspicious) {
      await sendTelegramNotification({
        type: "suspicious_activity",
        userId: session.id,
        timestamp: new Date().toISOString(),
        details: {
          ip,
          reason: suspiciousActivity.reason,
          severity: suspiciousActivity.severity,
        },
      });

      if (suspiciousActivity.severity === "high") {
        return NextResponse.json(
          { success: false, error: "Güvenlik nedeniyle işlem engellendi" },
          { status: 403 },
        );
      }
    }

    const iyzicoService = getIyzicoService();
    const paymentRequest = {
      price: parsedAmount,
      paidPrice: parsedAmount,
      currency,
      installment: 1,
      basketId: `basket-${Date.now()}`,
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",
      card: card || {},
      buyer: {
        id: session.id,
        name: session.name || "Kullanıcı",
        surname: "Onayla",
        email: session.email,
        identityNumber: "00000000000",
        registrationAddress: "Address",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000",
      },
      shippingAddress: {
        contactName: session.name || "Kullanıcı",
        city: "Istanbul",
        country: "Turkey",
        address: "Address",
        zipCode: "34000",
      },
      billingAddress: {
        contactName: session.name || "Kullanıcı",
        city: "Istanbul",
        country: "Turkey",
        address: "Address",
        zipCode: "34000",
      },
      basketItems: [
        {
          id: "item-1",
          name: "SMS Kredisi",
          category1: "Digital",
          category2: "Service",
          itemType: "VIRTUAL",
          price: parsedAmount,
        },
      ],
    };

    const paymentResponse = await iyzicoService.create3DSPayment(paymentRequest);

    if (paymentResponse.status !== "success") {
      await prisma.payment.create({
        data: {
          userId: session.id,
          provider: "iyzico",
          providerRef: paymentResponse.paymentId,
          amount: parsedAmount,
          currency,
          status: "failed",
        },
      });
      return NextResponse.json(
        { success: false, error: paymentResponse.errorMessage || "Ödeme başlatılamadı" },
        { status: 400 },
      );
    }

    const mockMode =
      (process.env.IYZICO_BASE_URL || "sandbox").includes("sandbox") ||
      (process.env.IYZICO_API_KEY || "").includes("sandbox") ||
      process.env.SMS_PROVIDER_MODE === "mock";

    if (mockMode) {
      const updated = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
          data: {
            userId: session.id,
            provider: "iyzico",
            providerRef: paymentResponse.paymentId,
            amount: parsedAmount,
            currency,
            status: "completed",
          },
        });

        const user = await tx.user.update({
          where: { id: session.id },
          data: { balance: { increment: parsedAmount } },
        });

        await tx.walletTransaction.create({
          data: {
            userId: session.id,
            type: "deposit",
            amount: parsedAmount,
            status: "completed",
            description: "Cüzdan yükleme",
          },
        });

        return { payment, balance: user.balance };
      });

      return NextResponse.json({
        success: true,
        credited: true,
        paymentId: updated.payment.providerRef,
        amount: parsedAmount,
        currency,
        balance: updated.balance,
      });
    }

    await prisma.payment.create({
      data: {
        userId: session.id,
        provider: "iyzico",
        providerRef: paymentResponse.paymentId,
        amount: parsedAmount,
        currency,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      credited: false,
      paymentId: paymentResponse.paymentId,
      paymentUrl: `https://sandbox.iyzipay.com/payment/${paymentResponse.paymentId}`,
      amount: paymentResponse.price,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json({ success: false, error: "Sunucu hatası oluştu" }, { status: 500 });
  }
}
