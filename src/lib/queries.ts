import type { GrandeCategorieValue } from "src/lib/categories";
import type {
  CommissionData,
  ProjetData,
  ProjetDataLight,
} from "src/lib/types";
import { parse as superJSONParse } from "superjson";

import type {
  Enfant,
  PrismaClient,
  Projet,
  SocieteProduction,
  User,
} from ".prisma/client";

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
    where: { projets: { some: {} } },
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

function updateProjet(
  projet: Projet,
  updates: Record<string, unknown>,
  callback: (updatedProjet: ProjetData) => void
): void {
  window
    .fetch(`/api/dossiers/${projet.id}`, {
      body: JSON.stringify(updates),
      method: "PUT",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .then(async (r) => r.text())
    .then((rawJson) => {
      const updatedProjet = superJSONParse<ProjetData>(rawJson);
      callback(updatedProjet);
    })
    .catch((e) => {
      throw e;
    });
}

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

export type {
  CommissionData,
  DossiersFilters,
  ProjetDataLight,
  SearchResultsType,
};
export { getCommissions, searchEnfants, searchProjets, updateProjet };
