import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
    const paymentId = typeof body.paymentId === "string" ? body.paymentId.trim() : "";
    const conversationData = typeof body.conversationData === "string" ? body.conversationData : undefined;
    if (!paymentId) {
      return NextResponse.json({ success: false, error: "Payment ID gerekli." }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({ where: { providerRef: paymentId, userId: session.id } });
    if (!payment) {
      return NextResponse.json({ success: false, error: "Ödeme kaydı bulunamadı." }, { status: 404 });
    }
    if (payment.status === "completed") {
      const user = await prisma.user.findUnique({ where: { id: session.id }, select: { balance: true } });
      return NextResponse.json({ success: true, credited: false, alreadyCompleted: true, paymentId, amount: payment.amount, currency: payment.currency, balance: user?.balance ?? 0 });
    }

    const paymentResponse = await getIyzicoService().complete3DSPayment(paymentId, conversationData);
    if (paymentResponse.status !== "success") {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: "failed" } });
      await sendTelegramNotification({ type: "payment_failed", paymentId, amount: payment.amount, userId: session.id, timestamp: new Date().toISOString() });
      return NextResponse.json({ success: false, error: paymentResponse.errorMessage || "Ödeme tamamlanamadı. Kartınızdan ücret çekilmediyse tekrar deneyin." }, { status: 400 });
    }

    const settled = await prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.updateMany({ where: { id: payment.id, status: "pending" }, data: { status: "completed" } });
      if (updatedPayment.count === 1) {
        await tx.user.update({ where: { id: session.id }, data: { balance: { increment: payment.amount } } });
        await tx.walletTransaction.create({ data: { userId: session.id, type: "deposit", amount: payment.amount, status: "completed", description: "Cüzdan yükleme" } });
      }
      const user = await tx.user.findUnique({ where: { id: session.id }, select: { balance: true } });
      return { credited: updatedPayment.count === 1, balance: user?.balance ?? 0 };
    });

    await sendTelegramNotification({ type: "payment_success", paymentId, amount: payment.amount, userId: session.id, timestamp: new Date().toISOString() });
    return NextResponse.json({ success: true, credited: settled.credited, paymentId, amount: payment.amount, currency: payment.currency, balance: settled.balance });
  } catch (error) {
    console.error("Payment completion failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: "Ödeme sonucu işlenemedi. Destek ekibiyle iletişime geçin." }, { status: 500 });
  }
}
