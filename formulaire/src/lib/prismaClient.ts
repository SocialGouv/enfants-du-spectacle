// cf https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client";

const getClient = () => {
  return new PrismaClient();
};

const client = getClient();

export default client;
