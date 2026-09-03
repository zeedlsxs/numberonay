import { clearAuthCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
