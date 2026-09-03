import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { isDatabaseUnreachable, prisma } from "@/lib/prisma";
import { requireJwtSecret } from "@/lib/secrets";

export const TOKEN_COOKIE = "token";
const DEFAULT_DAYS = 30;
const REMEMBER_DAYS = 90;

export type JwtPayload = {
  userId: string;
  email: string;
  role: string;
  name?: string | null;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  balance: number;
};

type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  balance: number;
};

function jwtSecret(): string {
  return requireJwtSecret();
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JwtPayload, remember = false): string {
  return jwt.sign(payload, jwtSecret(), {
    expiresIn: remember ? `${REMEMBER_DAYS}d` : `${DEFAULT_DAYS}d`,
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret()) as JwtPayload;
    if (!decoded?.userId || !decoded?.email) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
    balance: user.balance,
  };
}

export async function setAuthCookie(token: string, remember = false) {
  const store = await cookies();
  const maxAge = (remember ? REMEMBER_DAYS : DEFAULT_DAYS) * 24 * 60 * 60;
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.set(TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const store = await cookies();
  const token = store.get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        balance: true,
      },
    });

    if (!user || user.status !== "active") return null;
    return toPublicUser(user);
  } catch (error) {
    if (isDatabaseUnreachable(error)) {
      return {
        id: payload.userId,
        email: payload.email,
        name: payload.name ?? null,
        role: payload.role,
        status: "active",
        balance: 0,
      };
    }
    return null;
  }
}

export { EMAIL_INVALID_MESSAGE, isValidEmail, normalizeEmail } from "@/lib/email";
