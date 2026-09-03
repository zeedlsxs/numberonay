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

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tickets });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  }

  const body = (await request.json()) as {
    subject?: unknown;
    category?: unknown;
    message?: unknown;
  };

  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const category = typeof body.category === "string" ? body.category : "other";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!subject || !message) {
    return NextResponse.json({ error: "Konu ve mesaj gerekli." }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: user.id,
      subject,
      category,
      message,
    },
  });

  return NextResponse.json({ ticket });
}
