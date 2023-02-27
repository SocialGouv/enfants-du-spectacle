import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DemandeurModel, DossierModel, EnfantModel, RelatedDossierModel, RelatedEnfantModel, SocieteProductionModel } from "prisma/zod";
import prisma from "src/lib/prismaClient";
import { z } from "zod";

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

  console.log('data : ', data)

  //console.log('data reveived : ', data)

  try {
  
    //HANDLE SOCIETE PROD
    const SocieteData = SocieteProductionModel.omit({id: true, conventionCollectiveCode: true})
    const createSociete = await prisma?.societeProduction.create({
      data: {
        ...SocieteData.parse(data.societeProduction),
        ["conventionCollectiveCode"]: data.demandeur.conventionCollectiveCode,
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
      id: ''
    };
    if (!demandeurFound) {
      const DemandeurData = DemandeurModel.omit({id: true, societeProductionId: true})
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
    const commissions = await prisma?.commission.findMany({
      orderBy: { date: "asc" },
      where: {
        dateLimiteDepot: { gte: new Date() },
        departement: createSociete?.departement,
      },
    });
  
    //HANDLE DOSSIER
    const DossierData = DossierModel.omit({id: true, commissionId: true, statut: true, societeProductionId: true, numeroDS: true, userId: true, demandeurId: true, externalId: true})
    const createDossier = await prisma?.dossier.create({
      data: {
        ...DossierData.parse(data.dossier),
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
        dateDepot: new Date(),
        statut: "CONSTRUCTION",
        justificatifs: data.dossier.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i),
        statusNotification: "NOUVEAU",
        source: "FORM_EDS",
        conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
        externalId: data.dossier.id.toString()
      },
    });

    //HANDLE ENFANTS
    if(data.enfants.length > 0) {
      const EnfantsData = EnfantModel.omit({id: true, dossierId: true})
      const CreateEnfants = await prisma?.enfant.createMany({
        data: data.enfants.map((enfant) => {
          enfant.nombreJours = typeof enfant.nombreJours === "string" ? parseInt(enfant.nombreJours) : enfant.nombreJours
          enfant.montantCachet = typeof enfant.montantCachet === "string" ? parseInt(enfant.montantCachet) : enfant.montantCachet
          enfant.nombreCachets = typeof enfant.nombreCachets === "string" ? parseInt(enfant.nombreCachets) : enfant.nombreCachets
          enfant.remunerationTotale = typeof enfant.remunerationTotale === "string" ? parseInt(enfant.remunerationTotale) : enfant.remunerationTotale
          enfant.nombreLignes = typeof enfant.nombreLignes === "string" ? parseInt(enfant.nombreLignes) : enfant.nombreLignes
          return {
            ...EnfantsData.parse(enfant), 
            dossierId: createDossier.id,
            externalId: enfant.id.toString(),
            justificatifs: enfant.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i),
          }
        })
      })
    }


    res.status(200).json({ message: "Dossier created successfully" });
  } catch (e) {
    console.log('error : ', e)
    res.status(500).json({error : e})
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
    //HANDLE DOSSIER
    const DossierData = DossierModel.omit({id: true, commissionId: true, statut: true, societeProductionId: true, numeroDS: true, userId: true, demandeurId: true, externalId: true})
    const updateDossier = await prisma?.dossier.update({
      data: {
        ...DossierData.parse(data.dossier),
        statut: "CONSTRUCTION",
        conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
        justificatifs: data.dossier.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i),
        statusNotification: "MIS_A_JOUR",
      },
      where: {
          externalId: data.dossier.id.toString()
      }
    });

    //HANDLE ENFANTS
    const listEnfant: Enfant[] = await prisma?.enfant.findMany({
      where: {
        dossierId: updateDossier.id
      }
    })
    console.log('list enfants : ', listEnfant)
    const EnfantsData = EnfantModel.omit({id: true, dossierId: true, adresseEnfant: true, adresseRepresentant1: true, adresseRepresentant2: true, nomRepresentant1: true, nomRepresentant2: true, prenomRepresentant1: true, prenomRepresentant2: true, cdc: true})
    data.enfants.map(async (enfant) => {
      enfant.nombreJours = typeof enfant.nombreJours === "string" ? parseInt(enfant.nombreJours) : enfant.nombreJours
      enfant.montantCachet = typeof enfant.montantCachet === "string" ? parseInt(enfant.montantCachet) : enfant.montantCachet
      enfant.nombreCachets = typeof enfant.nombreCachets === "string" ? parseInt(enfant.nombreCachets) : enfant.nombreCachets
      enfant.remunerationTotale = typeof enfant.remunerationTotale === "string" ? parseInt(enfant.remunerationTotale) : enfant.remunerationTotale
      enfant.nombreLignes = typeof enfant.nombreLignes === "string" ? parseInt(enfant.nombreLignes) : enfant.nombreLignes
      if(listEnfant.find(enfantL => enfantL.externalId === enfant.id.toString() )) {
        console.log('has to update enfant :', enfant)
        const updateEnfant = await prisma?.enfant.update({
          data: {
            ...EnfantsData.parse(enfant),
            justificatifs: enfant.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i),
          },
          where: {
            externalId: enfant.id.toString()
          }
        })
      } else {
        console.log('has to create enfant :', enfant)
        const CreateEnfants = await prisma?.enfant.create({
          data: {
            ...EnfantsData.parse(enfant), 
            dossierId: updateDossier.id,
            externalId: enfant.id.toString(),
            justificatifs: enfant.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i),
          }
        })
      }
    })
  
    res.status(200).json({ message: "Dossier updated successfully" });

  } catch (e) {
    console.log('error : ', e)
    res.status(500).json({error : e})
  }

};

export default withSentry(handler);
