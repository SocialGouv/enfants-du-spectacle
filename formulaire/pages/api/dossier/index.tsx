import { Dossier, Prisma, StatutDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DossierData } from "src/fetching/dossiers";
import { STATUS_EN_COURS, STATUS_TERMINES, CATEGORIES } from "src/lib/helpers";
import { statusGroup } from "src/lib/types";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const numberByPage = 10;
  const page = req.query.page
    ? (parseInt(req.query.page as string) - 1) * numberByPage
    : 0;
  const termToOrder = req.query.termToOrder as keyof Dossier;
  const order = req.query.order as "asc" | "desc";
  const status = req.query.status as statusGroup;

  const orderBy: Prisma.Enumerable<Prisma.DossierOrderByWithRelationInput> = {};
  orderBy[termToOrder] = order;

  try {
    const dossiers = await prisma.dossier.findMany({
      include: {
        creator: true,
        enfants: {
          include: {
            piecesDossier: true,
          },
        },
        demandeur: true,
        piecesDossier: true,
      },
      skip: page,
      take: numberByPage,
      where: {
        AND: [
          {
            nom: {
              contains: req.query.search as string,
              mode: "insensitive",
            },
          },
          {
            statut: {
              in:
                (status === "enCours" &&
                  (STATUS_EN_COURS as StatutDossier[])) ||
                (STATUS_TERMINES as StatutDossier[]),
            },
          },
        ],
        OR: [
          {
            collaboratorIds: {
              has: session?.user?.id,
            },
          },
          {
            creatorId: session?.user?.id,
          },
        ],
      },
      orderBy: [orderBy],
    });
    const countCurrent = await prisma.dossier.count({
      where: {
        AND: [
          {
            nom: {
              contains: req.query.search as string,
              mode: "insensitive",
            },
          },
          {
            statut: {
              in:
                (status === "enCours" &&
                  (STATUS_EN_COURS as StatutDossier[])) ||
                (STATUS_TERMINES as StatutDossier[]),
            },
          },
        ],
        OR: [
          {
            collaboratorIds: {
              has: session?.user?.id,
            },
          },
          {
            creatorId: session?.user?.id,
          },
        ],
      },
    });
    const countEnCours = await prisma.dossier.count({
      where: {
        AND: [
          {
            nom: {
              contains: req.query.search as string,
              mode: "insensitive",
            },
          },
          {
            statut: {
              in: STATUS_EN_COURS as StatutDossier[],
            },
          },
        ],
        OR: [
          {
            collaboratorIds: {
              has: session?.user?.id,
            },
          },
          {
            creatorId: session?.user?.id,
          },
        ],
      },
    });
    const countTermines = await prisma.dossier.count({
      where: {
        AND: [
          {
            nom: {
              contains: req.query.search as string,
              mode: "insensitive",
            },
          },
          {
            statut: {
              in: STATUS_TERMINES as StatutDossier[],
            },
          },
        ],
        OR: [
          {
            collaboratorIds: {
              has: session?.user?.id,
            },
          },
          {
            creatorId: session?.user?.id,
          },
        ],
      },
    });
    res.status(200).json({
      dossiers: dossiers,
      countCurrent: countCurrent,
      countEnCours: countEnCours,
      countTermines: countTermines,
    });
  } catch (e: unknown) {
    console.log(e);
  }
};

const post: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const parsed: Dossier = JSON.parse(req.body);
  if (!session?.user?.id) {
    res.status(401).json({ error: "User ID is required" });
    return;
  }

  const data = {
    creatorId: session.user.id,
    dateDerniereModification: new Date(),
    dateCreation: parsed.dateCreation,
    demandeurId: parsed.demandeurId,
    nom: parsed.nom,
    source: "FORM_EDS",
    scenesSensibles: []
  };
  try {
    const dossier = await prisma.dossier.create({ data });
    res.status(200).json(dossier);
  } catch (e: unknown) {
    console.log(e);
  }
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: DossierData = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  // Create a clean data object without relations
  const updateData = {
    nom: parsed.nom,
    statut: parsed.statut,
    categorie: parsed.categorie,
    collaboratorIds: parsed.collaboratorIds,
    justificatifs: parsed.justificatifs,
    scenesSensibles: parsed.scenesSensibles,
    presentation: parsed.presentation,
    dateDebut: parsed.dateDebut,
    dateFin: parsed.dateFin,
    number: parsed.number,
    dateCreation: parsed.dateCreation,
    cdc: parsed.cdc,
    scenario: parsed.scenario,
    securite: parsed.securite,
    complementaire: parsed.complementaire,
    dateDepot: parsed.dateDepot,
    demandeurId: parsed.demandeurId,
    commissionDate: parsed.commissionDate,
    commissionString: parsed.commissionString,
    dateDerniereModification: new Date()
  };

  const produitupdated = await prisma.dossier.update({
    data: updateData,
    where: { id: parsed.id },
  });
  res.status(200).json(produitupdated);
};

export default withSentry(handler);
