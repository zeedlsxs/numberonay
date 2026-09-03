import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSmsProvider } from "@/lib/sms/mock-provider";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  }

  const activations = await prisma.activation.findMany({
    where: { userId: user.id },
    include: { service: true, country: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    activations: activations.map((item) => ({
      id: item.id,
      service: item.service.name,
      country: item.country.name,
      flag: item.country.flag,
      phoneNumber: item.phoneNumber,
      price: item.price,
      status: item.status,
      smsCode: item.smsCode,
      smsText: item.smsText,
      createdAt: item.createdAt,
      expiresAt: item.expiresAt,
    })),
  });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  }

  const body = (await request.json()) as { serviceId?: unknown; countryId?: unknown };
  const serviceId = typeof body.serviceId === "string" ? body.serviceId : "";
  const countryId = typeof body.countryId === "string" ? body.countryId : "";

  if (!serviceId || !countryId) {
    return NextResponse.json({ error: "Servis ve ülke seçin." }, { status: 400 });
  }

  const offer = await prisma.serviceCountry.findUnique({
    where: { serviceId_countryId: { serviceId, countryId } },
    include: { service: true, country: true },
  });

  if (!offer || !offer.service.isActive || !offer.country.isActive) {
    return NextResponse.json({ error: "Bu kombinasyon şu an satılmıyor." }, { status: 400 });
  }

  if (offer.stock <= 0) {
    return NextResponse.json({ error: "Stok tükendi." }, { status: 400 });
  }

  if (user.balance < offer.price) {
    return NextResponse.json(
      { error: "Yetersiz bakiye. Önce cüzdanınıza yükleme yapın." },
      { status: 400 },
    );
  }

  const provider = getSmsProvider();
  const purchased = await provider.buyNumber(serviceId, countryId);

  const result = await prisma.$transaction(async (tx) => {
    const fresh = await tx.user.findUnique({ where: { id: user.id } });
    if (!fresh || fresh.balance < offer.price) {
      throw new Error("INSUFFICIENT");
    }

    await tx.user.update({
      where: { id: user.id },
      data: { balance: { decrement: offer.price } },
    });

    await tx.serviceCountry.update({
      where: { id: offer.id },
      data: { stock: { decrement: 1 } },
    });

    const activation = await tx.activation.create({
      data: {
        userId: user.id,
        serviceId,
        countryId,
        phoneNumber: purchased.phoneNumber,
        price: offer.price,
        status: "WAITING_SMS",
        providerOrderId: purchased.providerOrderId,
        expiresAt: purchased.expiresAt,
      },
      include: { service: true, country: true },
    });

    await tx.walletTransaction.create({
      data: {
        userId: user.id,
        type: "purchase",
        amount: -offer.price,
        status: "completed",
        description: `${offer.service.name} / ${offer.country.name} numarası`,
      },
    });

    return activation;
  });

  return NextResponse.json({
    activation: {
      id: result.id,
      phoneNumber: result.phoneNumber,
      price: result.price,
      status: result.status,
      expiresAt: result.expiresAt,
    },
  });
}
