import type {
  Commentaire,
  Commission,
  Demandeur,
  Dossier,
  Enfant,
  PieceDossier,
  PieceDossierEnfant,
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
): Promise<
  (Enfant & {
    dossier: Dossier & { user: User | null };
    piecesDossier: PieceDossierEnfant[];
  })[]
> => {
  try {
    return await prismaClient.enfant.findMany({
      include: {
        dossier: {
          include: { commission: true, societeProduction: true, user: true },
        },
        piecesDossier: true,
      },
      where: { OR: [{ nom: { search } }, { prenom: { search } }] },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const searchDossierByExternalId = async (
  prismaClient: PrismaClient,
  dossierId: number
) => {
  try {
    return await prismaClient.dossier.findMany({
      include: {
        commission: true,
        demandeur: true,
        enfants: true,
        societeProduction: true,
        user: true,
      },
      where: { externalId: dossierId },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const searchDemandeur = async (prismaClient: PrismaClient, email: string) => {
  try {
    return await prismaClient.demandeur.findUnique({
      where: { email: email },
    });
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

const createDemandeur = async (
  prismaClient: PrismaClient,
  demandeur: Omit<Demandeur, "id">
) => {
  try {
    return await prismaClient.demandeur.create({ data: demandeur });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const getUpcomingCommissionsByLimitDate = async (
  prismaClient: PrismaClient,
  departement: string
) => {
  try {
    return await prismaClient.commission.findMany({
      orderBy: { date: "asc" },
      where: {
        dateLimiteDepot: { gte: new Date() },
        departement: departement,
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const searchSocieteProductionBySiret = async (
  prismaClient: PrismaClient,
  siretTmp: string
) => {
  try {
    return await prismaClient.societeProduction.findMany({
      where: { siret: siretTmp },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const createSocieteProduction = async (
  prismaClient: PrismaClient,
  societeProduction: Omit<SocieteProduction, "id">
) => {
  try {
    return await prismaClient.societeProduction.create({
      data: societeProduction,
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const createDossier = async (
  prismaClient: PrismaClient,
  dossier: Omit<Dossier, "id" | "numeroDS" | "userId">
) => {
  try {
    return await prismaClient.dossier.create({ data: dossier });
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
    commission: Commission;
    _count: {
      enfants: number;
    } | null;
  })[]
> => {
  try {
    console.log("dossiers...");
    return await prismaClient.dossier.findMany({
      include: {
        _count: { select: { enfants: true } },
        commission: true,
        societeProduction: true,
        user: true,
      },
      where: {
        OR: [
          { nom: { search } },
          {
            societeProduction: {
              nom: { search },
            },
          },
        ],
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const updateConstructDossier = async (
  prismaClient: PrismaClient,
  dossier: Omit<Dossier, "id" | "numeroDS" | "userId">,
  dossierId: number
) => {
  try {
    return await prismaClient.dossier.update({
      data: dossier,
      where: { id: dossierId },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const deleteEnfants = async (prismaClient: PrismaClient, dossierId: number) => {
  try {
    return await prismaClient.enfant.deleteMany({
      where: { dossierId: dossierId },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const createEnfant = async (prismaClient: PrismaClient, enfant: Enfant) => {
  try {
    return await prismaClient.enfant.create({ data: enfant });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const createPieceDossierEnfant = async (
  prismaClient: PrismaClient,
  piece: Omit<PieceDossierEnfant, "id">
) => {
  try {
    return await prismaClient.pieceDossierEnfant.create({ data: piece });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const createPieceDossier = async (
  prismaClient: PrismaClient,
  piece: Omit<PieceDossier, "id">
) => {
  try {
    return await prismaClient.pieceDossier.create({ data: piece });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const deletePieceDossier = async (
  prismaClient: PrismaClient,
  dossierId: number
) => {
  try {
    return await prismaClient.pieceDossier.deleteMany({
      where: { dossierId: dossierId },
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

const createCommentaire = (commentaire: Commentaire) => {
  window
    .fetch(`/api/commentaires`, {
      body: JSON.stringify(commentaire),
      method: "POST",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const deleteCommentaire = (id: number) => {
  window
    .fetch(`/api/commentaires`, {
      body: JSON.stringify(id),
      method: "DELETE",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const createCommission = (commission: Commission) => {
  window
    .fetch(`/api/commissions`, {
      body: JSON.stringify(commission),
      method: "POST",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const removeCommission = (id: number) => {
  window
    .fetch(`/api/commissions`, {
      body: JSON.stringify(id),
      method: "DELETE",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const createUser = (user: User) => {
  window
    .fetch(`/api/users`, {
      body: JSON.stringify(user),
      method: "POST",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const removeUser = (id: number) => {
  window
    .fetch(`/api/users`, {
      body: JSON.stringify(id),
      method: "DELETE",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

function getDataDS(): void {
  window
    .fetch(`/api/dsapi`, {
      method: "GET",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
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
      commission: Commission;
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
  departement?: string;
  grandeCategorie?: GrandeCategorieValue;
}

export type {
  CommissionData,
  DossierData,
  DossierDataLight,
  DossiersFilters,
  SearchResultsType,
};
export {
  createCommentaire,
  createCommission,
  createDemandeur,
  createDossier,
  createEnfant,
  createPieceDossier,
  createPieceDossierEnfant,
  createSocieteProduction,
  createUser,
  deleteCommentaire,
  deleteEnfants,
  deletePieceDossier,
  getDataDS,
  getUpcomingCommissionsByLimitDate,
  removeCommission,
  removeUser,
  searchDemandeur,
  searchDossierByExternalId,
  searchDossiers,
  searchEnfants,
  searchSocieteProductionBySiret,
  updateConstructDossier,
  updateDossier,
};