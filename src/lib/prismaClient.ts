import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

console.log("DATABASE_URL", process.env.DATABASE_URL)

const client =
  globalThis.prismaClient ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ["query", "info", "warn", "error"],
  });

globalThis.prismaClient = client;

export default client;
