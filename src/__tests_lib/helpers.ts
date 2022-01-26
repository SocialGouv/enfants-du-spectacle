import prismaClient from "src/lib/prismaClient";

import type { PrismaPromise } from ".prisma/client";

export function truncateDb(): PrismaPromise<unknown> {
  return prismaClient.$queryRaw`TRUNCATE "Account", "Commission", "Demandeur", "Dossier", "Enfant", "Session", "SocieteProduction", "User";`;
}
