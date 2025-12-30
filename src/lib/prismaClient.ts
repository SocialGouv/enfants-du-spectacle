import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

// Prisma client generation can fail in some sandboxed environments (eg restricted
// filesystem permissions during OpenSSL detection). In that case, importing
// `@prisma/client` throws: "@prisma/client did not initialize yet".
//
// For Next.js builds (SSG page data collection), we prefer to not hard-fail and
// instead defer DB usage to runtime.
let client: PrismaClient | undefined;

try {
  client =
    globalThis.prismaClient ??
    new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "postgresql://dummy:dummy@dummy:5432/dummy",
        },
      },
      log: ["info", "warn", "error"],
    });

  globalThis.prismaClient = client;
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn("PrismaClient initialization failed; prisma client is undefined", e);
}

export default client;
