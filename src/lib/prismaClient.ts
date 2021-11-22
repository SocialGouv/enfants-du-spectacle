// cf https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | null;
  // function getPrismaClient(): PrismaClient;
}

const getPrismaClient = function (): PrismaClient {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    if (!global.prisma) global.prisma = new PrismaClient();
    return global.prisma;
  }
};

export default getPrismaClient;
