import type { Commission, Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import type { RelatedDossierModel } from "../../../../../../prisma/zod/dossier";
import type { RelatedEnfantModel } from "../../../../../../prisma/zod/enfant";
import { DemandeurModel } from "../../../../../../prisma/zod/demandeur";
import { DossierModel } from "../../../../../../prisma/zod/dossier";
import { EnfantModel } from "../../../../../../prisma/zod/enfant";
import { SocieteProductionModel } from "../../../../../../prisma/zod/societeproduction";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import type { z } from "zod";

import client from "src/lib/prismaClient";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

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
        ["conventionCollectiveCode"]: data.demandeur.conventionCollectiveCode || "",
        ["otherConventionCollective"]: data.demandeur.otherConventionCollective || null,
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
    let createDemandeur;
    if (!demandeurFound) {
      const DemandeurData = DemandeurModel.omit({
        id: true,
        societeProductionId: true,
      });
        // Conversion explicite du type pour Prisma
        delete data.demandeur.conventionCollectiveCode
        delete data.demandeur.otherConventionCollective
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
    } else {
      createDemandeur = demandeurFound;
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
    // Valider avec Zod puis préparer les données pour Prisma
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
    
    // Valider les données avec Zod
    const validatedDossierData = DossierData.parse(data.dossier);
    
    // Préparer les données du dossier sans piecesDossier
    const justificatifs = data.dossier.piecesDossier 
      ? data.dossier.piecesDossier
          .map((piece) => piece.type)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      : [];

    // Créer la structure de données pour Prisma avec les propriétés explicites
    const createDossier = await client.dossier.create({
      data: {
        nom: validatedDossierData.nom,
        presentation: validatedDossierData.presentation,
        dateDebut: validatedDossierData.dateDebut,
        dateFin: validatedDossierData.dateFin,
        scenesSensibles: validatedDossierData.scenesSensibles,
        justificatifs,
        categorie: validatedDossierData.categorie,
        
        // Ajouter les relations et autres champs spécifiques à cette opération
        commission: {
          connect: {
            id: commissions[0].id,
          },
        },
        conventionCollectiveCode: data.demandeur.conventionCollectiveCode || null,
        otherConventionCollective: data.demandeur.otherConventionCollective || null,
        dateDepot: new Date(),
        demandeur: {
          connect: {
            id: createDemandeur.id,
          },
        },
        externalId: data.dossier.id.toString(),
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
      
      // Préparer les données avec des conversions de type adéquates pour Prisma
      const enfantDataForPrisma = data.enfants.map((enfant) => {
        // Validation via le schema Zod
        const validatedData = EnfantsData.parse(enfant);
        
        // Conversion explicite des types pour Prisma
        return {
          ...validatedData,
          dossierId: createDossier.id,
          externalId: enfant.id.toString(),
          // Convertir en nombres explicitement pour Prisma
          nombreJours: typeof enfant.nombreJours === "string" 
            ? parseInt(enfant.nombreJours) 
            : Number(enfant.nombreJours),
          montantCachet: typeof enfant.montantCachet === "string"
            ? parseFloat(enfant.montantCachet)
            : Number(enfant.montantCachet),
          nombreCachets: typeof enfant.nombreCachets === "string"
            ? parseInt(enfant.nombreCachets)
            : Number(enfant.nombreCachets),
          remunerationTotale: typeof enfant.remunerationTotale === "string"
            ? parseInt(enfant.remunerationTotale)
            : Number(enfant.remunerationTotale),
          nombreLignes: typeof enfant.nombreLignes === "string"
            ? parseInt(enfant.nombreLignes)
            : Number(enfant.nombreLignes),
          justificatifs: enfant.piecesDossier
            ? enfant.piecesDossier
                .map((piece) => piece.type)
                .filter((item, i, ar) => ar.indexOf(item) === i)
            : [],
        };
      });
      
      const CreateEnfants = await client.enfant.createMany({
        data: enfantDataForPrisma,
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

  console.log("UPDATING DOSSIER : ", data.dossier.nom, ", ", data.dossier.id);

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
    
    // Valider les données avec Zod
    const validatedDossierData = DossierData.parse(data.dossier);
    
    // Extraire piecesDossier qui n'est pas une propriété reconnue par Prisma
    const { piecesDossier, ...dossierWithoutPiecesDossier } = validatedDossierData;
    
    // Convertir les justificatifs à partir de piecesDossier si nécessaire
    const justificatifs = piecesDossier
      ? piecesDossier
          .map((piece) => piece.type)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      : [];
    
    // Créer l'objet de données pour Prisma
    const dossierPrismaData = {
      ...dossierWithoutPiecesDossier,
      justificatifs,
      conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
      otherConventionCollective: data.demandeur.otherConventionCollective,
      statusNotification: "MIS_A_JOUR" as const,
      statut: "CONSTRUCTION" as const,
    };
    
    // Effectuer la mise à jour
    const updateDossier = await client.dossier.update({
      data: dossierPrismaData,
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
      id: true,
    });
    // Pour chaque enfant dans les données
    for (const enfant of data.enfants) {
      try {
        // Valider les données de l'enfant avec Zod
        const validatedData = EnfantsData.parse(enfant);
        
        // Extraire l'ID de l'enfant pour la recherche
        const enfantExternalId = enfant.id.toString();
        
        // Vérifier si l'enfant existe déjà
        const enfantExistant = listEnfant.find(e => e.externalId === enfantExternalId);
        
        // Préparer un objet Prisma valide avec les justificatifs extraits de piecesDossier
        const justificatifs = Array.isArray(enfant.piecesDossier) 
          ? enfant.piecesDossier.map(piece => piece.type).filter((item, i, ar) => ar.indexOf(item) === i)
          : [];
          
        // Créer un objet avec uniquement les propriétés acceptées par Prisma
        const prismaValidData = {
          nom: validatedData.nom,
          prenom: validatedData.prenom,
          dateNaissance: validatedData.dateNaissance,
          typeEmploi: validatedData.typeEmploi,
          nomPersonnage: validatedData.nomPersonnage,
          periodeTravail: validatedData.periodeTravail,
          nombreJours: Number(validatedData.nombreJours),
          contexteTravail: validatedData.contexteTravail,
          montantCachet: Number(validatedData.montantCachet),
          nombreCachets: Number(validatedData.nombreCachets),
          nombreLignes: Number(validatedData.nombreLignes),
          remunerationsAdditionnelles: validatedData.remunerationsAdditionnelles,
          remunerationTotale: Number(validatedData.remunerationTotale),
          justificatifs,
          // Autres champs si nécessaire...
          typeConsultation: validatedData.typeConsultation,
          typeConsultationMedecin: validatedData.typeConsultationMedecin,
          dateConsultation: validatedData.dateConsultation,
          checkTravailNuit: validatedData.checkTravailNuit,
          textTravailNuit: validatedData.textTravailNuit
        };
        
        if (enfantExistant) {
          // Mise à jour d'un enfant existant
          await client.enfant.update({
            where: { externalId: enfantExternalId },
            data: prismaValidData
          });
        } else {
          // Création d'un nouvel enfant
          console.log(`Création d'un nouvel enfant: ${validatedData.nom} ${validatedData.prenom}, ID: ${enfant.id}`);
          await client.enfant.create({
            data: {
              ...prismaValidData,
              dossierId: updateDossier.id,
              externalId: enfantExternalId
            }
          });
        }
      } catch (e) {
        console.log("PROBLÈME avec enfant:", enfant.id, e);
      }
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

export default withSentry(handler);
