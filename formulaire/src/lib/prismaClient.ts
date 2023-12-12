// cf https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | null;
  // function getPrismaClient(): PrismaClient;
}

const getClient = () => {
  return new PrismaClient();
};

const client = getClient();
global.prisma = client;

export default client;
