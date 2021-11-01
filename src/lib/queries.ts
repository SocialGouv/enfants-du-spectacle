import type { GrandeCategorieValue } from "src/lib/categories";

import type {
  Commission,
  Enfant,
  PrismaClient,
  Projet,
  SocieteProduction,
  User,
} from ".prisma/client";

type ProjetData = Projet & {
  user: User | null;
  societeProduction: SocieteProduction;
  _count: {
    enfants: number;
  } | null;
};

type CommissionData = Commission & { projets: ProjetData[] };

const getCommissions = async (
  prismaClient: PrismaClient
): Promise<CommissionData[]> => {
  return prismaClient.commission.findMany({
    include: {
      projets: {
        include: {
          _count: { select: { enfants: true } },
          societeProduction: true,
          user: true,
        },
        orderBy: { id: "desc" },
      },
    },
    take: 3,
  });
};

const searchEnfants = async (
  prismaClient: PrismaClient,
  search: string
): Promise<(Enfant & { projet: Projet & { user: User | null } })[]> => {
  return prismaClient.enfant.findMany({
    include: { projet: { include: { societeProduction: true, user: true } } },
    where: { OR: [{ nom: { search } }, { prenom: { search } }] },
  });
};

const searchProjets = async (
  prismaClient: PrismaClient,
  search: string
): Promise<
  (Projet & {
    societeProduction: SocieteProduction;
    user: User | null;
    _count: {
      enfants: number;
    } | null;
  })[]
> => {
  return prismaClient.projet.findMany({
    include: {
      _count: { select: { enfants: true } },
      societeProduction: true,
      user: true,
    },
    where: { nom: { search } },
  });
};

interface SearchResultsType {
  enfants: (Enfant & {
    projet: Projet & {
      user?: User | null;
      societeProduction: SocieteProduction;
    };
  })[];
  projets: (Projet & {
    societeProduction: SocieteProduction;
    user: User | null;
    _count: {
      enfants: number;
    } | null;
  })[];
}

interface DossiersFilters {
  userId?: number;
  societeProductionId?: number;
  grandeCategorie?: GrandeCategorieValue;
}

export type { CommissionData, DossiersFilters, ProjetData, SearchResultsType };
export { getCommissions, searchEnfants, searchProjets };
