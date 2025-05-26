import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "next-auth/react";
import { loadDossierWithRemunerations } from "src/lib/pdfLoader";
import prismaClient from "src/lib/prismaClient";
import type { CommissionData, DossierData } from "src/lib/types";
import { generatePV } from "src/lib/pdf/pdfGeneratePV";
import { generateFE } from "src/lib/pdf/pdfGenerateFE";
import { generateDA } from "src/lib/pdf/pdfGenerateDA";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const { type, dossierId, commissionId } = req.query;
      
      if (!type || typeof type !== "string") {
        return res.status(400).json({ error: "Type parameter is required (PV, FE, or DA)" });
      }
      
      let result;
      
      // Génération d'un PV à partir d'une commission
      if (type === 'PV') {
        if (!commissionId || typeof commissionId !== "string") {
          return res.status(400).json({ error: "Commission ID is required for PV generation" });
        }
        
        // SOLUTION FINALE: Chargement complet de la commission avec appel explicite à l'API de rémunérations
        console.log("FINAL: Chargement de la commission", commissionId);
        
        // 1. Charger la commission sans les rémunérations
        const commission = await prismaClient.commission.findUnique({
          where: { id: parseInt(commissionId) },
          include: {
            dossiers: {
              include: {
                instructeur: true,
                medecin: true,
                commission: true,
                societeProduction: true,
                enfants: true,
                piecesDossier: true,
                commentaires: true,
                demandeur: true,
              }
            }
          }
        });
        
        if (!commission) {
          return res.status(404).json({ error: "Commission not found" });
        }
        
        // 2. Pour chaque dossier, charger explicitement les rémunérations de chaque enfant via l'API
        console.log("FINAL: Récupération des rémunérations pour", commission.dossiers.length, "dossiers");
        
        for (const dossier of commission.dossiers) {
          // Extraire les IDs de tous les enfants du dossier
          const enfantIds = dossier.enfants.map(enfant => enfant.id);
          
          if (enfantIds.length > 0) {
            // Appeler directement l'API de rémunérations
            console.log(`FINAL: Récupération des rémunérations pour ${enfantIds.length} enfants du dossier ${dossier.id}`);
            
            const remunerations = await prismaClient.remuneration.findMany({
              where: {
                enfantId: { in: enfantIds }
              }
            });
            
            console.log(`FINAL: ${remunerations.length} rémunérations trouvées pour le dossier ${dossier.id}`);
            
            // Attacher chaque rémunération à l'enfant correspondant
            for (const enfant of dossier.enfants) {
              const enfantRems = remunerations.filter(rem => rem.enfantId === enfant.id);
              // Ajouter les rémunérations à l'enfant sous la propriété 'remuneration'
              // @ts-ignore - On ajoute cette propriété dynamiquement
              enfant.remuneration = enfantRems;
              console.log(`FINAL: Enfant ${enfant.id} a ${enfantRems.length} rémunérations`);
            }
          }
        }
        
        // Générer le PV avec les données complètes
        // @ts-ignore - On force le type CommissionData
        result = await generatePV(commission as CommissionData);
        return res.status(200).json({ success: true, message: "PV generated successfully" });
      }
      
      // Génération d'une fiche enfant (FE) ou d'une décision d'autorisation (DA)
      else if (type === 'FE' || type === 'DA') {
        if (!dossierId || typeof dossierId !== "string") {
          return res.status(400).json({ error: "Dossier ID is required for FE or DA generation" });
        }
        
        const dossier = await loadDossierWithRemunerations(parseInt(dossierId));
        if (!dossier) {
          return res.status(404).json({ error: "Dossier not found" });
        }
        
        if (type === 'FE') {
          // Générer la fiche enfant
          result = await generateFE([dossier]);
        } else {
          // Générer la décision d'autorisation
          result = await generateDA([dossier]);
        }
        
        return res.status(200).json({ success: true, message: `${type} generated successfully` });
      }
      
      else {
        return res.status(400).json({ error: "Invalid type parameter. Must be PV, FE, or DA" });
      }
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withSentry(handler);
