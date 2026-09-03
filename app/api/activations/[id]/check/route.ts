import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSmsProvider } from "@/lib/sms/mock-provider";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  }

  const { id } = await context.params;
  const activation = await prisma.activation.findFirst({
    where: { id, userId: user.id },
  });

  if (!activation) {
    return NextResponse.json({ error: "Aktivasyon bulunamadı." }, { status: 404 });
  }

  if (activation.status === "COMPLETED" || activation.status === "CANCELLED") {
    return NextResponse.json({ activation });
  }

  if (activation.expiresAt.getTime() < Date.now()) {
    const expired = await prisma.activation.update({
      where: { id: activation.id },
      data: { status: "EXPIRED" },
    });
    return NextResponse.json({ activation: expired });
  }

  const provider = getSmsProvider();
  const sms = await provider.getSms(activation.providerOrderId || activation.id);

  const updated = await prisma.activation.update({
    where: { id: activation.id },
    data: {
      status: "SMS_RECEIVED",
      smsCode: sms.code,
      smsText: sms.text,
    },
  });

  return NextResponse.json({ activation: updated });
}
