import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { EnfantData } from "src/fetching/dossiers";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// Fonction utilitaire pour supprimer les accents
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction utilitaire pour formater la date au format jj-mm-yyyy
function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Fonction pour générer le nameId
function generateNameId(nom: string, prenom: string, dateNaissance: Date): string {
  const nomFormatted = removeAccents(nom.trim()).toUpperCase();
  const prenomFormatted = removeAccents(prenom.trim()).toUpperCase();
  const dateFormatted = formatDateToString(dateNaissance);
  
  return `${nomFormatted}_${prenomFormatted}_${dateFormatted}`;
}

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  let nom = req.query.nom as string;
  let prenom = req.query.prenom as string;
  let populatedByUserId = session?.dbUser?.id;
  try {
    const enfants = await prisma.enfant.findMany({
      take: 5,
      include: {
        dossier: true,
        piecesDossier: true,
      },
      where: {
        AND: [
          {
            nom: {
              contains: nom,
              mode: "insensitive",
            },
          },
          {
            prenom: {
              contains: prenom,
              mode: "insensitive",
            },
          },
          { populatedByUserId: populatedByUserId },
        ],
      },
    });
    res.status(200).json(enfants);
  } catch (e: unknown) {
    console.log(e);
  }
};

const post: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  let data = JSON.parse(req.body) as Enfant;
  data.populatedByUserId = session?.dbUser?.id || null;
  
  // Générer automatiquement le nameId si les données nécessaires sont présentes
  if (data.nom && data.prenom && data.dateNaissance) {
    data.nameId = generateNameId(data.nom, data.prenom, new Date(data.dateNaissance));
  }
  
  try {
    const enfant = await prisma.enfant.create({ data });
    res.status(200).json(enfant);
  } catch (e: unknown) {
    console.log(e);
  }
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: EnfantData = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  parsed.nombreJours = parseInt(parsed.nombreJours?.toString() || "0");
  parsed.numeroSequence = parseInt(parsed.numeroSequence?.toString() || "0")
  parsed.montantCachet = parseFloat(parsed.montantCachet?.toString() || "0");
  parsed.nombreCachets = parseInt(parsed.nombreCachets?.toString() || "0");
  parsed.nombreLignes = parseInt(parsed.nombreLignes?.toString() || "0");
  parsed.remunerationTotale = parseFloat(
    parsed.remunerationTotale?.toString() || "0"
  );
  parsed.dateDerniereModification = new Date();

  // Générer le nameId si les données nécessaires sont présentes et qu'il n'existe pas déjà
  if (parsed.nom && parsed.prenom && parsed.dateNaissance && !parsed.nameId) {
    parsed.nameId = generateNameId(parsed.nom, parsed.prenom, new Date(parsed.dateNaissance));
  }

  if (parsed.remuneration) {
    parsed.remuneration.forEach(async (rem) => {
      try {
        await prisma.remuneration.update({
          data: rem,
          where: { id: rem.id },
        });
      } catch (e) {
        console.log("error, cannot update remuneration", rem.id);
        throw e;
      }
    });
  }

  // Create a clean data object without relation fields
  const enfantData = {
    id: parsed.id,
    nom: parsed.nom,
    prenom: parsed.prenom,
    dateNaissance: parsed.dateNaissance,
    typeEmploi: parsed.typeEmploi,
    nomPersonnage: parsed.nomPersonnage,
    periodeTravail: parsed.periodeTravail,
    nombreJours: parsed.nombreJours,
    contexteTravail: parsed.contexteTravail,
    montantCachet: parsed.montantCachet,
    nombreCachets: parsed.nombreCachets,
    nombreLignes: parsed.nombreLignes,
    remunerationsAdditionnelles: parsed.remunerationsAdditionnelles,
    remunerationTotale: parsed.remunerationTotale,
    numeroSequence: parsed.numeroSequence,
    dossierId: parsed.dossierId,
    cdc: parsed.cdc,
    adresseEnfant: parsed.adresseEnfant,
    nomRepresentant1: parsed.nomRepresentant1,
    prenomRepresentant1: parsed.prenomRepresentant1,
    adresseRepresentant1: parsed.adresseRepresentant1,
    telRepresentant1: parsed.telRepresentant1,
    mailRepresentant1: parsed.mailRepresentant1,
    adresseRepresentant2: parsed.adresseRepresentant2,
    nomRepresentant2: parsed.nomRepresentant2,
    prenomRepresentant2: parsed.prenomRepresentant2,
    telRepresentant2: parsed.telRepresentant2,
    mailRepresentant2: parsed.mailRepresentant2,
    externalId: parsed.externalId,
    typeConsultation: parsed.typeConsultation,
    typeConsultationMedecin: parsed.typeConsultationMedecin,
    dateConsultation: parsed.dateConsultation,
    dateDerniereModification: parsed.dateDerniereModification,
    populatedByUserId: parsed.populatedByUserId,
    checkTravailNuit: parsed.checkTravailNuit,
    textTravailNuit: parsed.textTravailNuit,
    livret: parsed.livret,
    autorisation: parsed.autorisation,
    situation: parsed.situation,
    contrat: parsed.contrat,
    certificat: parsed.certificat,
    avis: parsed.avis,
    nameId: parsed.nameId || (parsed.nom && parsed.prenom && parsed.dateNaissance ? generateNameId(parsed.nom, parsed.prenom, new Date(parsed.dateNaissance)) : null)
  };

  const enfantUpdated = await prisma.enfant.update({
    data: enfantData,
    where: { id: parsed.id },
  });

  res.status(200).json(enfantUpdated);
};

export default withSentry(handler);
