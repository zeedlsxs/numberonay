import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, detectSuspiciousActivity, validateCardNumber } from "@/lib/security";
import { getIyzicoService, isMockPaymentMode } from "@/lib/iyzico";
import { sendTelegramNotification } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: "Giriş yapmalısınız." }, { status: 401 });
    }

    if (process.env.PAYMENTS_ENABLED !== "true") {
      return NextResponse.json({ success: false, error: "Ödeme sistemi şu anda kullanıma kapalı." }, { status: 503 });
    }

    const body = await request.json();
    const { amount, currency = "TRY", card } = body;
    const parsedAmount = Number(amount);
    const cardNumber = typeof card?.cardNumber === "string" ? card.cardNumber.replace(/\\D/g, "") : "";
    const cardHolderName = typeof card?.cardHolderName === "string" ? card.cardHolderName.trim() : "";
    const expireMonth = typeof card?.expireMonth === "string" ? card.expireMonth : "";
    const expireYear = typeof card?.expireYear === "string" ? card.expireYear : "";
    const cvc = typeof card?.cvc === "string" ? card.cvc : "";
    const month = Number(expireMonth);

    if (!Number.isInteger(parsedAmount) || parsedAmount < 10 || parsedAmount > 100000) {
      return NextResponse.json({ success: false, error: "Yükleme tutarı 10 TL ile 100.000 TL arasında olmalı." }, { status: 400 });
    }
    if (currency !== "TRY") {
      return NextResponse.json({ success: false, error: "Sadece TL ile ödeme yapılabilir." }, { status: 400 });
    }
    if (!cardHolderName || !validateCardNumber(cardNumber) || month < 1 || month > 12 || !/^\\d{2}$/.test(expireYear) || !/^\\d{3,4}$/.test(cvc)) {
      return NextResponse.json({ success: false, error: "Kart bilgileri geçersiz. Lütfen tüm alanları kontrol edin." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = checkRateLimit(ip, 5, 60000);
    if (!rateLimitResult.allowed) {
      await sendTelegramNotification({ type: "suspicious_activity", userId: session.id, timestamp: new Date().toISOString(), details: { ip, reason: "Rate limit exceeded", resetTime: rateLimitResult.resetTime } });
      return NextResponse.json({ success: false, error: "Çok fazla istek. Lütfen birkaç dakika sonra tekrar deneyin.", resetTime: rateLimitResult.resetTime }, { status: 429 });
    }

    const suspiciousActivity = detectSuspiciousActivity(session.id, ip, 0, 60000);
    if (suspiciousActivity.isSuspicious && suspiciousActivity.severity === "high") {
      await sendTelegramNotification({ type: "suspicious_activity", userId: session.id, timestamp: new Date().toISOString(), details: { ip, reason: suspiciousActivity.reason, severity: suspiciousActivity.severity } });
      return NextResponse.json({ success: false, error: "Güvenlik nedeniyle işlem engellendi." }, { status: 403 });
    }

    const paymentResponse = await getIyzicoService().create3DSPayment({
      price: parsedAmount,
      paidPrice: parsedAmount,
      currency,
      installment: 1,
      basketId: "basket-" + Date.now(),
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",
      callbackUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/api/payments/complete",
      card: { cardHolderName, cardNumber, expireMonth: String(month).padStart(2, "0"), expireYear, cvc },
      buyer: {
        id: session.id,
        name: session.name || "Kullanıcı",
        surname: "Onayla",
        email: session.email,
        identityNumber: process.env.IYZICO_BUYER_IDENTITY_NUMBER || "74300864791",
        registrationAddress: "Istanbul",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000",
      },
      shippingAddress: { contactName: session.name || "Kullanıcı", city: "Istanbul", country: "Turkey", address: "Istanbul", zipCode: "34000" },
      billingAddress: { contactName: session.name || "Kullanıcı", city: "Istanbul", country: "Turkey", address: "Istanbul", zipCode: "34000" },
      basketItems: [{ id: "item-1", name: "SMS Kredisi", category1: "Digital", category2: "Service", itemType: "VIRTUAL", price: parsedAmount }],
    });

    if (paymentResponse.status !== "success" || !paymentResponse.paymentId) {
      const providerMessage = [paymentResponse.errorCode, paymentResponse.errorMessage].filter(Boolean).join(": ");
      await prisma.payment.create({ data: { userId: session.id, provider: "iyzico", providerRef: paymentResponse.paymentId, amount: parsedAmount, currency, status: "failed" } });
      return NextResponse.json({ success: false, error: providerMessage || "Ödeme başlatılamadı. Kart bilgilerini kontrol edip tekrar deneyin." }, { status: 400 });
    }

    if (isMockPaymentMode()) {
      const updated = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({ data: { userId: session.id, provider: "iyzico", providerRef: paymentResponse.paymentId, amount: parsedAmount, currency, status: "completed" } });
        const user = await tx.user.update({ where: { id: session.id }, data: { balance: { increment: parsedAmount } } });
        await tx.walletTransaction.create({ data: { userId: session.id, type: "deposit", amount: parsedAmount, status: "completed", description: "Cüzdan yükleme" } });
        return { payment, balance: user.balance };
      });
      return NextResponse.json({ success: true, credited: true, paymentId: updated.payment.providerRef, amount: parsedAmount, currency, balance: updated.balance });
    }

    await prisma.payment.create({ data: { userId: session.id, provider: "iyzico", providerRef: paymentResponse.paymentId, amount: parsedAmount, currency, status: "pending" } });
    return NextResponse.json({ success: true, credited: false, paymentId: paymentResponse.paymentId, conversationId: paymentResponse.conversationId, threeDSHtmlContent: paymentResponse.threeDSHtmlContent, amount: parsedAmount, currency });
  } catch (error) {
    console.error("Payment initiation failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: "Ödeme servisine ulaşılamadı. Lütfen kısa süre sonra tekrar deneyin." }, { status: 500 });
  }
}
