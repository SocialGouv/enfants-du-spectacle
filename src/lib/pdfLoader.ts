import prismaClient from "./prismaClient";
import type { CommissionData, DossierData } from "./types";

/**
 * Charge un dossier avec toutes ses relations, y compris les rémunérations des enfants
 */
export async function loadDossierWithRemunerations(dossierId: number): Promise<DossierData | null> {
  try {
    const dossier = await prismaClient.dossier.findUnique({
      where: { id: dossierId },
      include: {
        instructeur: true,
        medecin: true,
        commission: true,
        societeProduction: true,
        enfants: {
          include: {
            remuneration: true, // Important : inclure les rémunérations
          }
        },
        piecesDossier: true,
        commentaires: true,
        demandeur: true,
      }
    });

    return dossier as unknown as DossierData;
  } catch (error) {
    console.error("Erreur lors du chargement du dossier avec rémunérations:", error);
    return null;
  }
}

/**
 * Charge une commission avec tous ses dossiers et leurs relations, y compris les rémunérations des enfants
 */
export async function loadCommissionWithRemunerations(commissionId: number): Promise<CommissionData | null> {
  try {
    const commission = await prismaClient.commission.findUnique({
      where: { id: commissionId },
      include: {
        dossiers: {
          include: {
            instructeur: true,
            medecin: true,
            commission: true,
            societeProduction: true,
            enfants: {
              include: {
                remuneration: true, // Important : inclure les rémunérations
              }
            },
            piecesDossier: true,
            commentaires: true,
            demandeur: true,
          }
        }
      }
    });

    return commission as unknown as CommissionData;
  } catch (error) {
    console.error("Erreur lors du chargement de la commission avec rémunérations:", error);
    return null;
  }
}
