import type {
  Dossier,
  Enfant,
  PrismaClient,
  SocieteProduction,
  User,
} from "@prisma/client";
import type { GrandeCategorieValue } from "src/lib/categories";
import type {
  CommissionData,
  DossierData,
  DossierDataLight,
} from "src/lib/types";
import { parse as superJSONParse } from "superjson";

const searchEnfants = async (
  prismaClient: PrismaClient,
  search: string
): Promise<(Enfant & { dossier: Dossier & { user: User | null } })[]> => {
  try {
    return await prismaClient.enfant.findMany({
      include: {
        dossier: { include: { societeProduction: true, user: true } },
      },
      where: { OR: [{ nom: { search } }, { prenom: { search } }] },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const searchDossiers = async (
  prismaClient: PrismaClient,
  search: string
): Promise<
  (Dossier & {
    societeProduction: SocieteProduction;
    user: User | null;
    _count: {
      enfants: number;
    } | null;
  })[]
> => {
  try {
    return await prismaClient.dossier.findMany({
      include: {
        _count: { select: { enfants: true } },
        societeProduction: true,
        user: true,
      },
      where: { nom: { search } },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

function updateDossier(
  dossier: Dossier,
  updates: Record<string, unknown>,
  callback: (updatedDossier: DossierData) => void
): void {
  window
    .fetch(`/api/dossiers/${dossier.id}`, {
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
      const updatedDossier = superJSONParse<DossierData>(rawJson);
      callback(updatedDossier);
    })
    .catch((e) => {
      throw e;
    });
}

interface SearchResultsType {
  enfants: (Enfant & {
    dossier: Dossier & {
      user?: User | null;
      societeProduction: SocieteProduction;
    };
  })[];
  dossiers: (Dossier & {
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
  DossierData,
  DossierDataLight,
  DossiersFilters,
  SearchResultsType,
};
export { searchDossiers, searchEnfants, updateDossier };
