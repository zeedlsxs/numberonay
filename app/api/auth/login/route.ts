import { setAuthCookie, signToken, toPublicUser, verifyPassword } from "@/lib/auth";
import { isDatabaseUnreachable, prisma, withDbRetry } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      password?: unknown;
      remember?: unknown;
    };

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const remember = body.remember !== false;

    if (!email || !password) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const user = await withDbRetry(() => prisma.user.findUnique({ where: { email } }));
    if (!user) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    if (user.status !== "active") {
      return NextResponse.json({ error: "Hesabınız aktif değil." }, { status: 403 });
    }

    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const token = signToken(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      remember,
    );
    await setAuthCookie(token, remember);

    return NextResponse.json({ user: toPublicUser(user) });
  } catch (error) {
    if (isDatabaseUnreachable(error)) {
      return NextResponse.json(
        { error: "Veritabanına şu an ulaşılamıyor. Biraz sonra tekrar deneyin." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Giriş yapılamadı." }, { status: 401 });
  }
}
