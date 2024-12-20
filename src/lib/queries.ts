import type {
  Commentaire,
  Commission,
  Demandeur,
  Dossier,
  Enfant,
  PieceDossier,
  PieceDossierEnfant,
  PrismaClient,
  Role,
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
): Promise<Dossier[]> => {
  try {
    return await prismaClient.dossier.findMany({
      include: {
        commission: true,
        demandeur: true,
        enfants: {
          include: {
            piecesDossier: true,
          },
        },
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

const deleteEnfants = async (
  prismaClient: PrismaClient,
  dossierId: number,
  nom: string,
  prenom: string
) => {
  try {
    return await prismaClient.enfant.deleteMany({
      where: {
        dossierId: dossierId,
        nom: nom,
        prenom: prenom,
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const deleteEnfant = async (prismaClient: PrismaClient, enfantId: number) => {
  try {
    return await prismaClient.enfant.delete({
      where: {
        id: enfantId,
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const findEnfant = async (
  prismaClient: PrismaClient,
  dossierId: number,
  nom: string,
  prenom: string
) => {
  try {
    return await prismaClient.enfant.findFirst({
      where: {
        dossierId: dossierId,
        nom: nom,
        prenom: prenom,
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return [];
  }
};

const findEnfants = async (prismaClient: PrismaClient, dossierId: number) => {
  try {
    return await prismaClient.enfant.findMany({
      where: {
        dossierId: dossierId,
      },
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

const searchUsers = async (
  prismaClient: PrismaClient,
  role: Role,
  departement = ""
) => {
  try {
    return await prismaClient.user.findMany({
      where: {
        departement: departement,
        role: role,
      },
    });
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

const updateEnfant = (enfant: Enfant) => {
  window
    .fetch(`/api/enfant/${enfant.id}`, {
      body: JSON.stringify(enfant),
      method: "PUT",
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

const updateCommission = (commission: Commission) => {
  window
    .fetch(`/api/commissions/${commission.id}`, {
      body: JSON.stringify(commission),
      method: "PUT",
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

const updateEnfants = (cdc: number, dossierId: number) => {
  window
    .fetch(`/api/enfants`, {
      body: JSON.stringify({ cdc, dossierId }),
      method: "PUT",
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

const sendEmail = (
  type: string,
  attachment: string,
  dossier?: Dossier,
  to?: string,
  statut: string = ""
) => {
  window
    .fetch(`/api/mail/`, {
      body: JSON.stringify({
        attachment: attachment ? attachment : null,
        dossier: dossier ? dossier : null,
        to: to ? to : null,
        type: type,
        statut: statut ? statut : null,
      }),
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

const uploadZip = async (commission: Commission) => {
  return window
    .fetch(`/api/docs`, {
      body: JSON.stringify(commission),
      method: "POST",
    })
    .then(async (response) => {
      return response.text();
    });
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

const updatePieceDossierEnfant = async (
  prismaClient: PrismaClient,
  piece: PieceDossierEnfant
) => {
  try {
    return await prismaClient.pieceDossierEnfant.update({
      data: piece,
      where: {
        id: piece.id,
      },
    });
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

const deletePieceDossierEnfant = async (
  prismaClient: PrismaClient,
  dossierId: number
) => {
  try {
    return await prismaClient.pieceDossierEnfant.deleteMany({
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
  console.log("UPDATE DOSSIER", dossier);
  console.log("UPDATES", updates);

  window
    .fetch(`/api/dossiers/${dossier.id}`, {
      body: JSON.stringify(updates),
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // ✅ Ajout du header pour indiquer du JSON
      },
    })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`got status ${r.status}`);
      }
      return r.json(); // ✅ Remplace `r.text()` + `superJSONParse` par `r.json()`
    })
    .then((updatedDossier) => {
      callback(updatedDossier); // ✅ Directement passer l'objet JSON
    })
    .catch((e) => {
      console.error("Erreur dans updateDossier :", e);
    });
}

const deleteDossier = (id: number) => {
  window
    .fetch(`/api/dossiers/${id}`, {
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

const updateCommentairesNotifications = (commentaireIds: string[]) => {
  const url = `/api/sync/out/commentaires/notifications${
    commentaireIds.length > 0 ? "?" : ""
  }${commentaireIds.map((id, index) => {
    return `${index !== 0 ? "&" : ""}commentIds=${id}`;
  })}`
    .split(",")
    .join("");
  window
    .fetch(url, {
      // body: JSON.stringify(commentaireIds),
      method: "PUT",
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

const createCommission = (commission: Omit<Commission, "id">) => {
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

const updateUser = (user: User) => {
  window
    .fetch(`/api/users`, {
      body: JSON.stringify(user),
      method: "PUT",
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

const getDocDS = async (docUrl: string) => {
  const fetching = (
    await fetch(docUrl).then(async (r) => r.blob())
  ).arrayBuffer();
  return fetching;
};

const getDatasFromDS = async (dossierId: number) => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const query = `query getDossier(
    $dossierId: Int!
  ) {
    dossier(number: $dossierId) {
      id
      number
      archived
      state
      dateDerniereModification
      datePassageEnConstruction
      datePassageEnInstruction
      dateTraitement
      motivation
      motivationAttachment {
        ...FileFragment
      }
      attestation {
        ...FileFragment
      }
      pdf {
        url
      }
      instructeurs {
        email
      }
      champs {
        ...ChampFragment
        ...RootChampFragment
      }
    }
  }
  
  fragment ChampFragment on Champ {
    id
    label
    stringValue
    ... on DateChamp {
      date
    }
    ... on DatetimeChamp {
      datetime
    }
    ... on CheckboxChamp {
      checked: value
    }
    ... on DecimalNumberChamp {
      decimalNumber: value
    }
    ... on IntegerNumberChamp {
      integerNumber: value
    }
    ... on CiviliteChamp {
      civilite: value
    }
    ... on LinkedDropDownListChamp {
      primaryValue
      secondaryValue
    }
    ... on MultipleDropDownListChamp {
      values
    }
    ... on PieceJustificativeChamp {
      file {
        ...FileFragment
      }
    }
    ... on AddressChamp {
      address {
        ...AddressFragment
      }
    }
    ... on CommuneChamp {
      commune {
        name
        code
      }
      departement {
        name
        code
      }
    }
  }
  
  fragment RootChampFragment on Champ {
    ... on RepetitionChamp {
      champs {
        ...ChampFragment
      }
    }
    
    ... on DossierLinkChamp {
      dossier {
        id
        state
        usager {
          email
        }
      }
    }
  }
  
  fragment FileFragment on File {
    filename
    contentType
    checksum
    byteSizeBigInt
    url
  }
  
  fragment AddressFragment on Address {
    label
    type
    streetAddress
    streetNumber
    streetName
    postalCode
    cityName
    cityCode
    departmentName
    departmentCode
    regionName
    regionCode
  }`;

  const fetching = await fetch(
    "https://www.demarches-simplifiees.fr/api/v2/graphql",
    {
      body: JSON.stringify({
        operationName: "getDossier",
        query,
        variables: { dossierId },
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${String(DS_SECRET)}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then((r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r;
  });
  return fetching.json();
};

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
  deleteDossier,
  deleteEnfant,
  deleteEnfants,
  deletePieceDossier,
  deletePieceDossierEnfant,
  findEnfant,
  findEnfants,
  getDatasFromDS,
  getDocDS,
  getUpcomingCommissionsByLimitDate,
  removeCommission,
  removeUser,
  searchDemandeur,
  searchDossierByExternalId,
  searchDossiers,
  searchEnfants,
  searchSocieteProductionBySiret,
  searchUsers,
  sendEmail,
  updateCommentairesNotifications,
  updateCommission,
  updateConstructDossier,
  updateDossier,
  updateEnfant,
  updateEnfants,
  updatePieceDossierEnfant,
  updateUser,
  uploadZip,
};
