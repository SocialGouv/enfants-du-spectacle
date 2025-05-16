import { SocieteProduction, StatutDossier, Dossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DossierData, EnfantData } from "src/fetching/dossiers";
import { DemandeurData } from "src/lib/types";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  try {
    // Parse the request data
    const data = JSON.parse(req.body) as {
      dossier: DossierData;
      demandeur: DemandeurData;
      societeProduction: SocieteProduction;
      enfants: EnfantData[];
    };
    
    console.log("Processing complete dossier submission:", data.dossier.id);
    
    // Validate the dossier status
    if (
      data.dossier.statut !== "BROUILLON" &&
      data.dossier.statut !== "CONSTRUCTION"
    ) {
      res.status(400).json({ error: "Invalid dossier status" });
      return;
    }
    
    // If the dossier is in BROUILLON status, update it to CONSTRUCTION
    const newStatus = data.dossier.statut === "BROUILLON" ? "CONSTRUCTION" as StatutDossier : data.dossier.statut;
    
    // Get the department from the societe production
    const department = data.societeProduction.departement;
    let commissionId = null;
    let commissionString = data.dossier.commissionString;
    let commissionDate = data.dossier.commissionDate;

    // If we have a department, try to find an appropriate commission
    if (department) {
      // Find the next available commission for this department
      const today = new Date();
      const commission = await prisma.commission.findFirst({
        where: {
          departement: department,
          dateLimiteDepot: {
            gt: today // Commission's deadline must be in the future
          }
        },
        orderBy: {
          dateLimiteDepot: 'asc' // Get the earliest deadline
        }
      });
      console.log('commission found : ', commission)
      
      if (commission) {
        commissionId = commission.id;
        commissionString = `Commission du ${commission.date.toLocaleDateString('fr-FR')} - Département ${commission.departement}`;
        commissionDate = commission.date;
        console.log(`Assigning dossier to commission ID: ${commissionId}`);
      } else {
        console.log(`No suitable commission found for department: ${department}`);
      }
    }

    // Update the dossier with the new status, date of submission, and commission
    const dossierUpdated = await prisma.dossier.update({
      where: { id: data.dossier.id },
      data: {
        statut: newStatus,
        dateDepot: data.dossier.dateDepot || new Date(),
        dateDerniereModification: new Date(),
        commissionId: commissionId,
        commissionString: commissionString,
        commissionDate: commissionDate
      }
    });
    
    // Update the demandeur if needed
    if (data.demandeur && data.demandeur.id) {
      await prisma.demandeur.update({
        where: { id: data.demandeur.id },
        data: {
          email: data.demandeur.email,
          nom: data.demandeur.nom,
          prenom: data.demandeur.prenom,
          phone: data.demandeur.phone,
          fonction: data.demandeur.fonction,
          conventionCollectiveCode: data.demandeur.conventionCollectiveCode,
          otherConventionCollective: data.demandeur.otherConventionCollective,
          societeProductionId: data.demandeur.societeProductionId
        }
      });
    }
    
    // Update societe production if needed
    if (data.societeProduction && data.societeProduction.id) {
      await prisma.societeProduction.update({
        where: { id: data.societeProduction.id },
        data: {
          siret: data.societeProduction.siret,
          nom: data.societeProduction.nom,
          adresse: data.societeProduction.adresse,
          // Other societeProduction fields as needed
        }
      });
    }
    
    // Update enfants if needed
    if (data.enfants && data.enfants.length > 0) {
      // Process each enfant to make sure their data is up to date
      for (const enfant of data.enfants) {
        if (enfant.id) {
          await prisma.enfant.update({
            where: { id: enfant.id },
            data: {
              nom: enfant.nom,
              prenom: enfant.prenom,
              dateNaissance: enfant.dateNaissance,
              nomRepresentant1: enfant.nomRepresentant1,
              prenomRepresentant1: enfant.prenomRepresentant1,
              adresseRepresentant1: enfant.adresseRepresentant1,
              mailRepresentant1: enfant.mailRepresentant1,
              telRepresentant1: enfant.telRepresentant1,
              nomRepresentant2: enfant.nomRepresentant2,
              prenomRepresentant2: enfant.prenomRepresentant2,
              adresseRepresentant2: enfant.adresseRepresentant2,
              mailRepresentant2: enfant.mailRepresentant2,
              telRepresentant2: enfant.telRepresentant2,
              typeConsultation: enfant.typeConsultation,
              dateConsultation: enfant.dateConsultation,
              nombreJours: enfant.nombreJours,
              nombreCachets: enfant.nombreCachets,
              remunerationTotale: enfant.remunerationTotale,
              checkTravailNuit: enfant.checkTravailNuit,
              textTravailNuit: enfant.textTravailNuit,
              // Other enfant fields as needed
            }
          });
        }
      }
    }
    
    // Build response message
    const message = data.dossier.statut === "BROUILLON" 
      ? "Dossier submitted successfully" 
      : "Dossier updated successfully";
    
    res.status(200).json({ 
      success: true, 
      message: { message: data.dossier.commissionString || message },
      dossier: dossierUpdated 
    });
  } catch (error) {
    console.error("Error processing complete dossier submission:", error);
    res.status(500).json({ 
      error: "Failed to process dossier submission", 
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export default withSentry(handler);
