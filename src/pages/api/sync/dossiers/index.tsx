import type { Demandeur, SocieteProduction } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { EnfantData } from "formulaire/src/fetching/dossiers";
import type { NextApiHandler, NextApiRequest } from "next";
import prisma from "src/lib/prismaClient";
import { getUpcomingCommissionsByLimitDate } from "src/lib/queries";
import type { DossierData } from "src/lib/types";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.commissionId as string);
}

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as {
    dossier: DossierData;
    demandeur: Demandeur & {
      societeFound?: SocieteProduction;
      conventionCollectiveCode: string;
    };
    enfants: EnfantData[];
  };
  const { dossier, demandeur, enfants } = data;

  //HANDLE SOCIETE PROD
  const societeToCreate = demandeur.societeFound;
  delete societeToCreate.id;
  console.log("societe to create: ", societeToCreate);
  const createSociete = await prisma?.societeProduction.create({
    data: {
      ...societeToCreate,
      ["conventionCollectiveCode"]: demandeur.conventionCollectiveCode,
    },
  });

  //HANDLE FINDING DEMANDEUR
  const demandeurFound = await prisma?.demandeur.findUnique({
    where: {
      email: demandeur.email,
    },
  });
  console.log("demandeur found : ", demandeurFound);

  //HANDLE CREATING DEMANDEUR IF NOT FOUND
  let createDemandeur = {};
  if (!demandeurFound) {
    console.log("demandeur to create : ", demandeur);
    delete demandeur.id;
    delete demandeur.conventionCollectiveCode;
    delete demandeur.societeProductionId;
    delete demandeur.societeFound;
    createDemandeur = await prisma?.demandeur.create({
      data: {
        ...demandeur,
        fonction: "",
        societeProduction: {
          connect: {
            id: createSociete.id,
          },
        },
      },
    });
  }

  //SEARCHING FOR COMMISSION
  const commissions = await prisma?.commission.findMany({
    orderBy: { date: "asc" },
    where: {
      dateLimiteDepot: { gte: new Date() },
      departement: societeToCreate?.departement,
    },
  });
  console.log("commission found : ", commissions[0]);

  //CREATING DOSSIER
  console.log("dossier to create", dossier);
  delete dossier.id;
  delete dossier.user;
  delete dossier.user;
  delete dossier.enfants;
  delete dossier.Demandeur;
  const piecesDossier = dossier.piecesDossier;
  delete dossier.piecesDossier;
  delete dossier.userId;
  delete dossier.statut;
  delete dossier.scenario;
  delete dossier.securite;
  delete dossier.complementaire;
  delete dossier.demandeurId;
  const createDossier = await prisma?.dossier.create({
    data: {
      ...dossier,
      commission: {
        connect: {
          id: commissions[0].id,
        },
      },
      demandeur: {
        connect: {
          id: demandeurFound ? demandeurFound.id : createDemandeur.id,
        },
      },
      societeProduction: {
        connect: {
          id: createSociete.id,
        },
      },
      statut: "CONSTRUCTION",
    },
  });

  res.status(200).json({ message: "Dossier created successfully" });
};

const get: NextApiHandler = async (req, res) => {};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as {
    dossier: DossierData;
    demandeur: Demandeur & { societeFound?: SocieteProduction };
    enfants: EnfantData[];
  };
  console.log("dossier to update : ", data);
};

export default withSentry(handler);
