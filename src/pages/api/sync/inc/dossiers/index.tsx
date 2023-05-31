import type { Commission, Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import type { RelatedDossierModel, RelatedEnfantModel } from "prisma/zod";
import {
  DemandeurModel,
  DossierModel,
  EnfantModel,
  SocieteProductionModel,
} from "prisma/zod";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import prisma from "src/lib/prismaClient";
import type { z } from "zod";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as {
    dossier: z.infer<typeof RelatedDossierModel>;
    demandeur: z.infer<typeof DemandeurModel>;
    societeProduction: z.infer<typeof SocieteProductionModel>;
    enfants: z.infer<typeof RelatedEnfantModel>[];
  };

  console.log("data : ", data);

  //console.log('data reveived : ', data)

  try {
    //HANDLE SOCIETE PROD
    const SocieteData = SocieteProductionModel.omit({
      conventionCollectiveCode: true,
      otherConventionCollective: true,
      id: true,
    });
    const createSociete = await prisma?.societeProduction.create({
      data: {
        ...SocieteData.parse(data.societeProduction),
        ["conventionCollectiveCode"]: data.demandeur.conventionCollectiveCode,
        ["otherConventionCollective"]: data.demandeur.otherConventionCollective,
      },
    });
    //console.log('societe created')

    //HANDLE FINDING DEMANDEUR
    const demandeurFound = await prisma?.demandeur.findUnique({
      where: {
        email: data.demandeur.email,
      },
    });
    //console.log("demandeur found : ", demandeurFound);

    //HANDLE CREATING DEMANDEUR IF NOT FOUND
    let createDemandeur = {
      id: "",
    };
    if (!demandeurFound) {
      const DemandeurData = DemandeurModel.omit({
        id: true,
        societeProductionId: true,
      });
      createDemandeur = await prisma?.demandeur.create({
        data: {
          ...DemandeurData.parse(data.demandeur),
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
    const commissions: Commission[] = await prisma?.commission.findMany({
      orderBy: { date: "asc" },
      where: {
        dateLimiteDepot: { gte: new Date() },
        departement: createSociete?.departement,
      },
    });

    //HANDLE DOSSIER
    const DossierData = DossierModel.omit({
      commissionId: true,
      demandeurId: true,
      externalId: true,
      id: true,
      numeroDS: true,
      societeProductionId: true,
      statut: true,
      userId: true,
    });
    const createDossier = await prisma?.dossier.create({
      data: {
        ...DossierData.parse(data.dossier),
        commission: {
          connect: {
            id: commissions[0].id,
          },
        },
        conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
        otherConventionCollective: data.demandeur.otherConventionCollective,
        dateDepot: new Date(),
        demandeur: {
          connect: {
            id: demandeurFound ? demandeurFound.id : createDemandeur.id,
          },
        },
        externalId: data.dossier.id.toString(),
        justificatifs: data.dossier.piecesDossier
          .map((piece) => piece.type)
          .filter((item, i, ar) => ar.indexOf(item) === i),
        societeProduction: {
          connect: {
            id: createSociete.id,
          },
        },
        source: "FORM_EDS",
        statusNotification: "NOUVEAU",
        statut: "CONSTRUCTION",
      },
    });

    //HANDLE ENFANTS
    if (data.enfants.length > 0) {
      const EnfantsData = EnfantModel.omit({ dossierId: true, id: true });
      const CreateEnfants = await prisma?.enfant.createMany({
        data: data.enfants.map((enfant) => {
          enfant.nombreJours =
            typeof enfant.nombreJours === "string"
              ? parseInt(enfant.nombreJours)
              : enfant.nombreJours;
          enfant.montantCachet =
            typeof enfant.montantCachet === "string"
              ? parseFloat(enfant.montantCachet)
              : enfant.montantCachet;
          enfant.nombreCachets =
            typeof enfant.nombreCachets === "string"
              ? parseInt(enfant.nombreCachets)
              : enfant.nombreCachets;
          enfant.remunerationTotale =
            typeof enfant.remunerationTotale === "string"
              ? parseInt(enfant.remunerationTotale)
              : enfant.remunerationTotale;
          enfant.nombreLignes =
            typeof enfant.nombreLignes === "string"
              ? parseInt(enfant.nombreLignes)
              : enfant.nombreLignes;
          return {
            ...EnfantsData.parse(enfant),
            dossierId: createDossier.id,
            externalId: enfant.id.toString(),
            justificatifs: enfant.piecesDossier
              .map((piece) => piece.type)
              .filter((item, i, ar) => ar.indexOf(item) === i),
          };
        }),
      });
    }

    await prisma?.$disconnect()
    res.status(200).json({
      message: `${frenchDepartementName(
        commissions[0].departement
      )}, ${frenchDateText(commissions[0].date)}`,
    });
  } catch (e) {
    await prisma?.$disconnect()
    console.log("error : ", e);
    res.status(500).json({ error: e });
  }
};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as {
    dossier: z.infer<typeof RelatedDossierModel>;
    demandeur: z.infer<typeof DemandeurModel>;
    societeProduction: z.infer<typeof SocieteProductionModel>;
    enfants: z.infer<typeof RelatedEnfantModel>[];
  };

  try {
    const commissions = await prisma?.commission.findMany({
      orderBy: { date: "asc" },
      where: {
        dateLimiteDepot: { gte: new Date() },
        departement: data.societeProduction.departement,
      },
    });

    //HANDLE DOSSIER
    const DossierData = DossierModel.omit({
      commissionId: true,
      demandeurId: true,
      externalId: true,
      id: true,
      numeroDS: true,
      societeProductionId: true,
      statut: true,
      userId: true,
    });
    const updateDossier = await prisma?.dossier.update({
      data: {
        ...DossierData.parse(data.dossier),
        conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
        otherConventionCollective: data.demandeur.otherConventionCollective,
        justificatifs: data.dossier.piecesDossier
          .map((piece) => piece.type)
          .filter((item, i, ar) => ar.indexOf(item) === i),
        statusNotification: "MIS_A_JOUR",
        statut: "CONSTRUCTION",
      },
      where: {
        externalId: data.dossier.id.toString(),
      },
    });

    //HANDLE ENFANTS
    const listEnfant: Enfant[] = await prisma?.enfant.findMany({
      where: {
        dossierId: updateDossier.id,
      },
    });
    console.log("list enfants : ", listEnfant);
    const EnfantsData = EnfantModel.omit({
      adresseEnfant: true,
      cdc: true,
      dossierId: true,
      id: true
    });
    data.enfants.map(async (enfant) => {
      enfant.nombreJours =
        typeof enfant.nombreJours === "string"
          ? parseInt(enfant.nombreJours)
          : enfant.nombreJours;
      enfant.montantCachet =
        typeof enfant.montantCachet === "string"
          ? parseFloat(enfant.montantCachet)
          : enfant.montantCachet;
      enfant.nombreCachets =
        typeof enfant.nombreCachets === "string"
          ? parseInt(enfant.nombreCachets)
          : enfant.nombreCachets;
      enfant.remunerationTotale =
        typeof enfant.remunerationTotale === "string"
          ? parseInt(enfant.remunerationTotale)
          : enfant.remunerationTotale;
      enfant.nombreLignes =
        typeof enfant.nombreLignes === "string"
          ? parseInt(enfant.nombreLignes)
          : enfant.nombreLignes;
      if (
        listEnfant.find(
          (enfantL) => enfantL.externalId === enfant.id.toString()
        )
      ) {
        console.log("has to update enfant :", enfant);
        const updateEnfant = await prisma?.enfant.update({
          data: {
            ...EnfantsData.parse(enfant),
            justificatifs: enfant.piecesDossier
              .map((piece) => piece.type)
              .filter((item, i, ar) => ar.indexOf(item) === i),
          },
          where: {
            externalId: enfant.id.toString(),
          },
        });
      } else {
        console.log("has to create enfant :", enfant);
        const CreateEnfants = await prisma?.enfant.create({
          data: {
            ...EnfantsData.parse(enfant),
            dossierId: updateDossier.id,
            externalId: enfant.id.toString(),
            justificatifs: enfant.piecesDossier
              .map((piece) => piece.type)
              .filter((item, i, ar) => ar.indexOf(item) === i),
          },
        });
      }
    });
    await prisma?.$disconnect()
    res.status(200).json({
      message: `${frenchDepartementName(
        commissions[0].departement
      )}, ${frenchDateText(commissions[0].date)}`,
    });
  } catch (e) {
    await prisma?.$disconnect()
    console.log("error : ", e);
    res.status(500).json({ error: e });
  }
};

export default withSentry(handler);
