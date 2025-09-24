import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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
  let dataList = JSON.parse(req.body);
  
  try {
    // Préparer toutes les données avant la transaction
    const preparedData = dataList.enfants.map((data: any) => {
      // Transformer typeConsultation
      if (data.typeConsultation === "Un médecin Thalie Santé") {
        data.typeConsultation = "THALIE";
      }
      if (data.typeConsultation === "Un médecin généraliste") {
        data.typeConsultation = "GENERALISTE";
      }

      // Construire contexteTravail avec titres et sauts de ligne
      const contexteParts = [];
      if (data.tempsTravail) {
        contexteParts.push(`Temps de travail :\n${data.tempsTravail}`);
      }
      if (data.planningTravail) {
        contexteParts.push(`Planning de travail :\n${data.planningTravail}`);
      }
      if (data.lieuTravail) {
        contexteParts.push(`Lieu de travail :\n${data.lieuTravail}`);
      }
      data.contexteTravail = contexteParts.join("\n\n");

      // Construire adresses des représentants
      data.adresseRepresentant1 = [
        data.roadNumber,
        data.streetName, 
        data.postalCode,
        data.city
      ].filter(Boolean).join(" ");

      data.adresseRepresentant2 = [
        data.roadNumberTwo,
        data.streetNameTwo,
        data.postalCodeTwo,
        data.cityTwo
      ].filter(Boolean).join(" ");

      // Gérer travail de nuit
      data.checkTravailNuit = data.travailNuit === "Oui" || data.travailNuit === true;
      data.textTravailNuit = data.precisionsTravailNuit || "";

      // Stringifier les téléphones
      data.telRepresentant1 = data.telRepresentant1 ? JSON.stringify(data.telRepresentant1) : "";
      data.telRepresentant2 = data.telRepresentant2 ? JSON.stringify(data.telRepresentant2) : "";
      
      data.dossierId = dataList.dossierId;
      
      // Ajouter les dates de création/mise à jour
      const currentDate = new Date();
      data.dateDerniereModification = currentDate;
      data.createdAt = currentDate;
      data.updatedAt = currentDate;

      // === EXTRAIRE LES RÉMUNÉRATIONS ===
      const remunerations = [];
      
      // Mapping des types de rémunération vers les enums Prisma
      const remunerationMappings = [
        { montant: 'montantCachetTournage', nombre: 'nombreCachetsTournage', nature: 'CACHET_TOURNAGE', type: 'cachet' },
        { montant: 'montantCachetDoublage', nombre: 'nombreCachetsDoublage', nature: 'CACHET_DOUBLAGE', type: 'cachet', lignes: 'nombreLignesDoublage', dadr: 'montantTotalDadr' },
        { montant: 'montantCachetRepresentation', nombre: 'nombreCachetsRepresentation', nature: 'CACHET_REPRESENTATION', type: 'cachet' },
        { montant: 'montantCachetRepetition', nombre: 'nombreCachetsRepetition', nature: 'CACHET_REPETITION', type: 'cachet' },
        { montant: 'montantCachetHoraire', nombre: 'nombreCachetsHoraire', nature: 'CACHET_HORAIRE', type: 'cachet' },
        { montant: 'montantCachetSecurite', nombre: 'nombreCachetsSecurite', nature: 'CACHET_SECURITE', type: 'cachet' },
        { montant: 'montantCachetPostSynchro', nombre: 'nombreCachetsPostSynchro', nature: 'CACHET_POST_SYNCHRO', type: 'cachet' },
        { montant: 'montantCachetCaptation', nombre: 'nombreCachetsCaptation', nature: 'CACHET_CAPTATION', type: 'cachet' },
        { montant: 'montantCachetSpectacleVivant', nombre: 'nombreCachetsSpectacleVivant', nature: 'CACHET_SPECTACLE_VIVANT', type: 'cachet' },
        { montant: 'montantCachetRetake', nombre: 'nombreCachetsRetake', nature: 'CACHET_RETAKE', type: 'cachet' },
        { montant: 'montantForfait', nombre: 'nombreForfait', nature: 'AUTRE_GARANTIE', type: 'forfait', comment: 'Rémunération forfaitaire' },
      ];

      for (const mapping of remunerationMappings) {
        const montant = data[mapping.montant];
        const nombre = data[mapping.nombre];
        
        if ((montant && montant > 0) || (nombre && nombre > 0)) {
          const remuneration: any = {
            typeRemuneration: mapping.type,
            natureCachet: mapping.nature,
            montant: montant || 0,
            nombre: nombre || 0,
            nombreLignes: mapping.lignes ? (data[mapping.lignes] || 0) : 0,
            totalDadr: mapping.dadr ? (data[mapping.dadr] || 0) : null,
            comment: mapping.comment || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          remunerations.push(remuneration);
        }
      }

      // Calculer remunerationTotale à partir des rémunérations détaillées
      let totalRemuneration = 0;
      remunerations.forEach(rem => {
        totalRemuneration += (rem.montant || 0) * (rem.nombre || 1);
        if (rem.totalDadr) totalRemuneration += rem.totalDadr;
      });
      data.remunerationTotale = totalRemuneration;

      // Nettoyer les champs temporaires de l'enfant
      const cleanedEnfantData = { ...data };
      
      // Supprimer tous les champs de rémunération détaillés de l'objet enfant
      const fieldsToRemove = [
        'date', 'repQuality', 'roadNumber', 'streetName', 'postalCode', 'city',
        'repQualityTwo', 'roadNumberTwo', 'streetNameTwo', 'postalCodeTwo', 'cityTwo',
        'school', 'tempsTravail', 'lieuTravail', 'planningTravail', 'travailNuit', 'precisionsTravailNuit',
        'montantCachetTournage', 'nombreCachetsTournage',
        'montantCachetDoublage', 'nombreCachetsDoublage', 'nombreLignesDoublage', 'montantTotalDadr',
        'montantCachetRepresentation', 'nombreCachetsRepresentation',
        'montantCachetRepetition', 'nombreCachetsRepetition',
        'montantCachetHoraire', 'nombreCachetsHoraire',
        'montantCachetSecurite', 'nombreCachetsSecurite',
        'montantCachetPostSynchro', 'nombreCachetsPostSynchro',
        'montantCachetCaptation', 'nombreCachetsCaptation',
        'montantCachetSpectacleVivant', 'nombreCachetsSpectacleVivant',
        'montantCachetRetake', 'nombreCachetsRetake',
        'montantForfait', 'nombreForfait'
      ];
      
      fieldsToRemove.forEach(field => delete cleanedEnfantData[field]);

      return { enfantData: cleanedEnfantData, remunerations };
    });

    // ✨ TRANSACTION ATOMIQUE
    const result = await prisma.$transaction(async (tx) => {
      const operations = [];
      
      for (const { enfantData, remunerations } of preparedData) {
        // Vérifier si l'enfant existe déjà
        const existingEnfants = await tx.enfant.findMany({
          where: {
            dossierId: dataList.dossierId,
            nom: enfantData.nom,
            prenom: enfantData.prenom,
            dateNaissance: enfantData.dateNaissance,
          },
        });

        let enfantId: number;

        if (existingEnfants.length === 0) {
          // Créer nouvel enfant
          const enfant = await tx.enfant.create({ data: enfantData });
          enfantId = enfant.id;
          operations.push({ action: 'created', enfant: enfant.id });
        } else {
          // Mettre à jour enfant existant
          enfantId = existingEnfants[0].id;
          await tx.enfant.update({
            where: { id: enfantId },
            data: enfantData,
          });
          
          // Supprimer les anciennes rémunérations pour les remplacer
          await tx.remuneration.deleteMany({
            where: { enfantId: enfantId }
          });
          
          operations.push({ 
            action: 'updated', 
            enfant: enfantId 
          });
        }

        // Créer les nouvelles rémunérations
        for (const remuneration of remunerations) {
          await tx.remuneration.create({
            data: {
              ...remuneration,
              enfantId: enfantId
            }
          });
        }
      }
      
      return operations;
    });

    res.status(200).json({
      success: true,
      message: `${preparedData.length} enfants traités avec succès`,
      operations: result
    });

  } catch (error: unknown) {
    console.error("Erreur lors de l'import des enfants:", error);
    res.status(500).json({
      success: false,
      error: "Échec de l'import des enfants",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
};

export default withSentry(handler);
