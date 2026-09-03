import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  }

  const [active, completed, cancelled, recent] = await Promise.all([
    prisma.activation.count({
      where: { userId: user.id, status: { in: ["WAITING_SMS", "SMS_RECEIVED"] } },
    }),
    prisma.activation.count({
      where: { userId: user.id, status: "COMPLETED" },
    }),
    prisma.activation.count({
      where: { userId: user.id, status: { in: ["CANCELLED", "EXPIRED"] } },
    }),
    prisma.activation.findMany({
      where: { userId: user.id },
      include: { service: true, country: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return NextResponse.json({
    user,
    stats: {
      balance: user.balance,
      active,
      completed,
      cancelled,
    },
    recent: recent.map((item) => ({
      id: item.id,
      service: item.service.name,
      country: item.country.name,
      flag: item.country.flag,
      status: item.status,
      createdAt: item.createdAt,
    })),
  });
}
