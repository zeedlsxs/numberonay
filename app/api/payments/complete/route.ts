import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
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
    const { paymentId, conversationData } = body;
    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json({ success: false, error: "Payment ID gerekli" }, { status: 400 });
    }

    const paymentResponse = await getIyzicoService().complete3DSPayment(paymentId, conversationData);
    if (paymentResponse.status === "success") {
      await sendTelegramNotification({ type: "payment_success", paymentId: paymentResponse.paymentId, amount: paymentResponse.price, userId: session.id, timestamp: new Date().toISOString() });
      return NextResponse.json({ success: true, paymentId: paymentResponse.paymentId, amount: paymentResponse.price, currency: paymentResponse.currency });
    }
    await sendTelegramNotification({ type: "payment_failed", paymentId, amount: paymentResponse.price, userId: session.id, timestamp: new Date().toISOString() });
    return NextResponse.json({ success: false, error: paymentResponse.errorMessage || "Ödeme tamamlanamadı" }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: "Sunucu hatası oluştu" }, { status: 500 });
  }
}
