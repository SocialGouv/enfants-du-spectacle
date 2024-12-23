import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

const client =
  globalThis.prismaClient ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&connection_limit=5",
      },
    },
    log: ["info", "warn", "error"],
  });

globalThis.prismaClient = client;

export default client;
