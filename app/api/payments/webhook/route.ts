import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.IYZICO_WEBHOOK_SECRET?.trim();
  const providedSecret = request.headers.get("x-iyzico-webhook-secret")?.trim();
  if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ success: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const body = await request.json();
    const { paymentId, status, amount, userId } = body;
    if (!paymentId || typeof status !== "string") {
      return NextResponse.json({ success: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }
    // Payment settlement is handled by the verified provider callback.
    void amount;
    void userId;
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ success: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
}
