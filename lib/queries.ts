import type { Prisma } from "@prisma/client";

import type {
  Commission,
  PrismaClient,
  Projet,
  SocieteProduction,
  User,
} from ".prisma/client";

type CommissionData = Commission & {
  projets: (Projet & {
    user: User | null;
    societeProduction: SocieteProduction;
    _count: {
      enfants: number;
    } | null;
  })[];
};

const getCommissions = async (
  prismaClient: PrismaClient,
  search?: string
): Promise<CommissionData[]> => {
  const projetsQuery: Prisma.ProjetFindManyArgs = {
    include: {
      _count: { select: { enfants: true } },
      societeProduction: true,
      user: true,
    },
  };
  if (search) projetsQuery.where = { nom: { search } };
  const query: Prisma.CommissionFindManyArgs = {
    include: {
      projets: projetsQuery,
    },
    take: 3,
  };
  return prismaClient.commission.findMany(query);
};

export type { CommissionData };
export { getCommissions };
