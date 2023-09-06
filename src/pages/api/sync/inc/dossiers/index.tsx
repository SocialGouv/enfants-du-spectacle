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
import type { z } from "zod";

import { PrismaClient, Prisma } from '@prisma/client'
const client = new PrismaClient()

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

  //console.log('data reveived : ', data)

  try {
    //HANDLE SOCIETE PROD
    const SocieteData = SocieteProductionModel.omit({
      conventionCollectiveCode: true,
      otherConventionCollective: true,
      id: true,
    });
    const createSociete = await client.societeProduction.create({
      data: {
        ...SocieteData.parse(data.societeProduction),
        ["conventionCollectiveCode"]: data.demandeur.conventionCollectiveCode,
        ["otherConventionCollective"]: data.demandeur.otherConventionCollective,
      },
    });
    //console.log('societe created')

    //HANDLE FINDING DEMANDEUR
    const demandeurFound = await client.demandeur.findUnique({
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
      createDemandeur = await client.demandeur.create({
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
    const commissions: Commission[] = await client.commission.findMany({
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
    const createDossier = await client.dossier.create({
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
      const CreateEnfants = await client.enfant.createMany({
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

    res.status(200).json({
      message: `${frenchDepartementName(
        commissions[0].departement
      )}, ${frenchDateText(commissions[0].date)}`,
    });
  } catch (e) {
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

  console.log('UPDATING DOSSIER : ', data.dossier.nom, ', ', data.dossier.id)

  try {
    const commissions = await client.commission.findMany({
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
    const updateDossier = await client.dossier.update({
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
    const listEnfant: Enfant[] = await client.enfant.findMany({
      where: {
        dossierId: updateDossier.id,
      },
    });
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
        console.log("has to update enfant :", enfant.nom, ' ', enfant.prenom, ', ', enfant.id);
        const updateEnfant = await client.enfant.update({
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
        console.log("enfant updated :", updateEnfant.nom, ' ', updateEnfant.prenom, ', ', updateEnfant.externalId);
      } else {
        try {
          console.log("has to create enfant :", enfant.nom, ' ', enfant.prenom, ', ', enfant.id);
          const CreateEnfants = await client.enfant.create({
            data: {
              ...EnfantsData.parse(enfant),
              dossierId: updateDossier.id,
              externalId: enfant.id.toString(),
              justificatifs: enfant.piecesDossier
                .map((piece) => piece.type)
                .filter((item, i, ar) => ar.indexOf(item) === i),
            },
          });
          console.log("enfant updated :", CreateEnfants.nom, ' ', CreateEnfants.prenom, ', ', CreateEnfants.externalId);
        } catch (e) {
          console.log('PROBLEM with : ', enfant.nom, ' ', enfant.prenom, ', ', enfant.id)
        }
      }
    });
    res.status(200).json({
      message: `${frenchDepartementName(
        commissions[0].departement
      )}, ${frenchDateText(commissions[0].date)}`,
    });
  } catch (e) {
    console.log("error : ", e);
    res.status(500).json({ error: e });
  }
};

export default withSentry(handler);
