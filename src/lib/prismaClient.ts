import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const client =
  globalThis.prismaClient ??
  new PrismaClient({
    log: ["info", "warn", "error"],
  });

globalThis.prismaClient = client;
