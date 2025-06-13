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
    const preparedEnfants = dataList.enfants.map((data: any) => {
      // Transformer typeConsultation
      if (data.typeConsultation === "Un médecin Thalie Santé") {
        data.typeConsultation = "THALIE";
      }
      if (data.typeConsultation === "Un médecin généraliste") {
        data.typeConsultation = "GENERALISTE";
      }

      // Construire contexteTravail
      data.contexteTravail = data.tempsTravail
        ? data.tempsTravail + " - " + data.lieuTravail
        : data.lieuTravail;

      // Construire adresses
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

      // Gérer remunerationsAdditionnelles
      if (data.remunerationsAdditionnelles || data.remunerationsAdditionnelles === 0) {
        data.remunerationsAdditionnelles = JSON.stringify(data.remunerationsAdditionnelles);
      }

      // Calculer remunerationTotale
      const montant = data.montantCachet || 0;
      const cachets = data.nombreCachets || 0;
      const additionnelles = data.remunerationsAdditionnelles 
        ? JSON.parse(data.remunerationsAdditionnelles) : 0;
      
      data.remunerationTotale = (montant * cachets) + additionnelles;

      // Stringifier les téléphones
      data.telRepresentant1 = JSON.stringify(data.telRepresentant1);
      data.telRepresentant2 = JSON.stringify(data.telRepresentant2);
      data.dossierId = dataList.dossierId;

      // Nettoyer les champs temporaires
      const cleanedData = { ...data };
      delete cleanedData.date;
      delete cleanedData.repQuality;
      delete cleanedData.roadNumber;
      delete cleanedData.streetName;
      delete cleanedData.postalCode;
      delete cleanedData.city;
      delete cleanedData.repQualityTwo;
      delete cleanedData.roadNumberTwo;
      delete cleanedData.streetNameTwo;
      delete cleanedData.postalCodeTwo;
      delete cleanedData.cityTwo;
      delete cleanedData.school;
      delete cleanedData.tempsTravail;
      delete cleanedData.lieuTravail;

      return cleanedData;
    });

    // ✨ TRANSACTION ATOMIQUE
    const result = await prisma.$transaction(async (tx) => {
      const operations = [];
      
      for (const data of preparedEnfants) {
        // Vérifier si l'enfant existe déjà
        const existingEnfants = await tx.enfant.findMany({
          where: {
            dossierId: dataList.dossierId,
            nom: data.nom,
            prenom: data.prenom,
            dateNaissance: data.dateNaissance,
          },
        });

        if (existingEnfants.length === 0) {
          // Créer nouvel enfant
          const enfant = await tx.enfant.create({ data });
          operations.push({ action: 'created', enfant: enfant.id });
        } else {
          // Mettre à jour enfant(s) existant(s)
          await tx.enfant.updateMany({
            where: {
              nom: data.nom,
              prenom: data.prenom,
              dateNaissance: data.dateNaissance,
              dossierId: data.dossierId,
            },
            data: data,
          });
          operations.push({ 
            action: 'updated', 
            count: existingEnfants.length,
            enfant: existingEnfants[0].id 
          });
        }
      }
      
      return operations;
    });

    res.status(200).json({
      success: true,
      message: `${preparedEnfants.length} enfants traités avec succès`,
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
