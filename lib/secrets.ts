export const MIN_JWT_SECRET_LENGTH = 16;

export function readJwtSecret(): string | null {
  const secret = process.env.JWT_SECRET?.trim() || process.env.AUTH_SECRET?.trim() || "";
  if (secret.length < MIN_JWT_SECRET_LENGTH) return null;
  return secret;
}

export function requireJwtSecret(): string {
  const secret = readJwtSecret();
  if (!secret) {
    throw new Error("JWT_SECRET tanımlı ve en az 16 karakter olmalı.");
  }
  return secret;
}
