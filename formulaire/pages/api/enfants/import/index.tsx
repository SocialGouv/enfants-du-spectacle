import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { EnfantData } from "src/fetching/dossiers";
import prisma from "../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
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
    dataList.enfants.forEach(async (data: any) => {
      if (data.typeConsultation === "Un médecin Thalie Santé") {
        data.typeConsultation = "THALIE";
      }
      if (data.typeConsultation === "Un médecin généraliste") {
        data.typeConsultation = "GENERALISTE";
      }

      data.contexteTravail = data.tempsTravail + " - " + data.lieuTravail;

      data.adresseRepresentant1 =
        data.roadNumber +
        " " +
        data.streetName +
        " " +
        data.postalCode +
        " " +
        data.city;

      data.adresseRepresentant2 =
        data.roadNumberTwo +
        " " +
        data.streetNameTwo +
        " " +
        data.postalCodeTwo +
        " " +
        data.cityTwo;

      data.remunerationsAdditionnelles = JSON.stringify(
        data.remunerationsAdditionnelles
      );
      data.remunerationTotale =
        data.montantCachet * data.nombreCachets +
        JSON.parse(data.remunerationsAdditionnelles);

      data.telRepresentant1 = JSON.stringify(data.telRepresentant1);
      data.telRepresentant2 = JSON.stringify(data.telRepresentant2);
      data.dossierId = dataList.dossierId;

      delete data.date;
      delete data.repQuality;
      delete data.roadNumber;
      delete data.streetName;
      delete data.postalCode;
      delete data.city;
      delete data.repQualityTwo;
      delete data.roadNumberTwo;
      delete data.streetNameTwo;
      delete data.postalCodeTwo;
      delete data.cityTwo;
      delete data.school;
      delete data.tempsTravail;
      delete data.lieuTravail;

      // find existing enfants first
      const existingEnfants = await prisma.enfant.findMany({
        where: {
          dossierId: dataList.dossierId,
          nom: data.nom,
          prenom: data.prenom,
          dateNaissance: data.dateNaissance,
        },
      });
      if (existingEnfants.length === 0) {
        const enfant = await prisma.enfant.create({ data });
      } else {
        await prisma.enfant.updateMany({
          where: {
            nom: data.nom,
            prenom: data.prenom,
            dateNaissance: data.dateNaissance,
          },
          data: data,
        });
      }
    });
    res.status(200).json(dataList.enfants);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default withSentry(handler);
