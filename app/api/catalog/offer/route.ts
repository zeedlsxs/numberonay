import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId") || "";
  const countryId = searchParams.get("countryId") || "";

  if (!serviceId || !countryId) {
    return NextResponse.json({ error: "serviceId ve countryId gerekli." }, { status: 400 });
  }

  const offer = await prisma.serviceCountry.findUnique({
    where: { serviceId_countryId: { serviceId, countryId } },
  });

  return NextResponse.json({
    price: offer?.price ?? 2000,
    stock: offer?.stock ?? 0,
  });
}
