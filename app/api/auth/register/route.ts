import { hashPassword, isValidEmail, setAuthCookie, signToken, toPublicUser } from "@/lib/auth";
import { EMAIL_INVALID_MESSAGE } from "@/lib/email";
import { isDatabaseUnreachable, prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { readJwtSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      password?: unknown;
      acceptTerms?: unknown;
    };

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const acceptTerms = body.acceptTerms === true;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: EMAIL_INVALID_MESSAGE }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Şifre en az 8 karakter olmalıdır." }, { status: 400 });
    }
    if (!acceptTerms) {
      return NextResponse.json({ error: "Kullanım şartlarını kabul etmelisiniz." }, { status: 400 });
    }

    if (!readJwtSecret()) {
      return NextResponse.json(
        { error: "Kimlik doğrulama yapılandırması eksik. Lütfen daha sonra tekrar deneyin." },
        { status: 503 },
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Bu e-posta ile zaten bir hesap var." }, { status: 409 });
    }

    const userCount = await prisma.user.count();
    const hashed = await hashPassword(password);
    const isFirst = userCount === 0;
    const name = email.split("@")[0] || null;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        role: isFirst ? "admin" : "user",
        balance: isFirst ? 50000 : 0,
      },
    });

    if (isFirst) {
      await prisma.walletTransaction.create({
        data: {
          userId: user.id,
          type: "bonus",
          amount: 50000,
          status: "completed",
          description: "Kurucu hesap başlangıç bakiyesi",
        },
      });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
    await setAuthCookie(token, true);

    return NextResponse.json({ user: toPublicUser(user) });
  } catch (error) {
    if (isDatabaseUnreachable(error)) {
      return NextResponse.json(
        { error: "Veritabanına şu an ulaşılamıyor. Biraz sonra tekrar deneyin." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Kayıt tamamlanamadı." }, { status: 500 });
  }
}
