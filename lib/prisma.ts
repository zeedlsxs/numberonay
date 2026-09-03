import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const url = (process.env.DIRECT_URL || process.env.DATABASE_URL || "").trim();
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(url ? { datasources: { db: { url } } } : {}),
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;

export function isDatabaseUnreachable(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /P1001|P1002|P1003|P1011|P1017|P2021|P2022|Can't reach database|Environment variable not found|exceeded the data transfer quota|timed out|ECONNRESET|ECONNREFUSED/i.test(
    message,
  );
}

export async function withDbRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown;
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      if (!isDatabaseUnreachable(error) || index === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (index + 1)));
      await prisma.$disconnect().catch(() => undefined);
    }
  }
  throw last;
}

export async function pingDatabase(): Promise<{ ok: boolean; ms: number }> {
  const started = Date.now();
  try {
    await withDbRetry(() => prisma.$queryRaw`SELECT 1`);
    return { ok: true, ms: Date.now() - started };
  } catch {
    return { ok: false, ms: Date.now() - started };
  }
}
