import { generateDA } from "./pdfGenerateDA";
import { uploadDecisionToS3 } from "../fetching/docs";
import type { DossierData } from "../types";
import prismaClient from "../prismaClient";

/**
 * Génère une décision administrative PDF et l'upload vers S3
 * @param dossiers - Les dossiers pour lesquels générer la décision
 * @param sendEmail - Si true, retourne aussi le contenu en base64 pour l'email
 * @param enfantId - ID de l'enfant si c'est une décision individuelle
 * @returns Objet contenant l'URL S3, la clé S3 et optionnellement le base64
 */
export const generateAndUploadDA = async (
  dossiers: DossierData[],
  sendEmail = false,
  enfantId?: number
): Promise<{
  s3Url: string;
  s3Key: string;
  pdfBase64?: string;
}> => {
  // Générer le PDF en format binary (base64)
  const pdfBase64 = await generateDA(dossiers, true, enfantId) as string;
  
  if (!pdfBase64) {
    throw new Error("Erreur lors de la génération du PDF");
  }

  const dossierId = dossiers[0].id;

  // Générer un nom de fichier adapté selon qu'il s'agit d'une décision individuelle ou complète
  const fileName = enfantId && dossiers[0].enfants.length > 0
    ? `DECISION_AUTORISATION_${dossiers[0].enfants[0]?.nom || 'ENFANT'}_${dossiers[0].enfants[0]?.prenom || 'PRENOM'}_${dossiers[0].nom?.replaceAll(".", "_") || 'DOSSIER'}`
    : `DECISION_AUTORISATION_${dossiers[0].nom?.replaceAll(".", "_") || 'DOSSIER'}`;

  try {
    // Upload vers S3
    const uploadResult = await uploadDecisionToS3(pdfBase64, dossierId, fileName);

    // Retourner les informations avec optionnellement le base64 pour l'email
    return {
      s3Url: uploadResult.s3Url,
      s3Key: uploadResult.s3Key,
      ...(sendEmail && { pdfBase64 })
    };
  } catch (error) {
    console.error("Erreur lors de l'upload S3 de la décision:", error);
    throw new Error("Erreur lors de l'upload de la décision vers S3");
  }
};

/**
 * Génère une décision individuelle pour un enfant et met à jour la base de données
 * @param dossier - Les données du dossier
 * @param enfantId - ID de l'enfant
 * @returns Objet contenant l'URL S3, la clé S3 et le base64
 */
export const generateAndUploadDAForEnfant = async (
  dossier: DossierData,
  enfantId: number
): Promise<{
  s3Url: string;
  s3Key: string;
  pdfBase64: string;
}> => {
  // Générer et uploader la décision individuelle
  const result = await generateAndUploadDA([dossier], true, enfantId);
  
  // Mettre à jour l'enfant avec le lien S3 en base de données
  try {
    const response = await fetch('/api/enfants/update-decision-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enfantId: enfantId,
        decisonS3Link: result.s3Url
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur lors de la mise à jour du lien S3:', errorData);
    } else {
      console.log(`Lien S3 sauvegardé avec succès pour l'enfant ${enfantId}: ${result.s3Url}`);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du lien S3 pour l\'enfant:', error);
  }
  
  return {
    s3Url: result.s3Url,
    s3Key: result.s3Key,
    pdfBase64: result.pdfBase64 as string
  };
};

/**
 * Version simplifiée qui génère et upload, puis met à jour la base de données
 * @param dossierId - ID du dossier
 * @param enfantId - ID de l'enfant si c'est une décision individuelle
 * @returns URL S3 de la décision
 */
export const generateAndUploadDAById = async (
  dossierId: number,
  enfantId?: number
): Promise<string> => {
  // Récupérer les données du dossier avec toutes les relations nécessaires
  const dossier = await prismaClient.dossier.findUnique({
    where: { id: dossierId },
    include: {
      commission: true,
      enfants: {
        include: {
          remuneration: true
        }
      },
      demandeur: {
        include: {
          societeProduction: true
        }
      },
      societeProduction: true
    }
  });

  if (!dossier) {
    throw new Error(`Dossier avec l'ID ${dossierId} introuvable`);
  }

  // Convertir en format DossierData (peut nécessiter un casting)
  const dossierData = dossier as unknown as DossierData;

  const result = await generateAndUploadDA([dossierData], false, enfantId);
  return result.s3Url;
};
