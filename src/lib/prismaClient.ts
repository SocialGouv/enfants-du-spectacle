// cf https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default client;
