import { Demandeur, SocieteProduction, Dossier, PrismaClient } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { EnfantData } from "formulaire/src/fetching/dossiers";
import type { NextApiHandler, NextApiRequest } from "next";
import { DemandeurModel, DossierModel, EnfantModel, RelatedDossierModel, SocieteProductionModel } from "prisma/zod";
import prisma from "src/lib/prismaClient";
import type { DossierData } from "src/lib/types";
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
  try {
    const data = JSON.parse(req.body) as {
      dossier: z.infer<typeof DossierModel>;
      demandeur: z.infer<typeof DemandeurModel>;
      societeProduction: z.infer<typeof SocieteProductionModel>;
      enfants: z.infer<typeof EnfantModel>[];
    };

    console.log('data reveived : ', data)
  
    //HANDLE SOCIETE PROD
    const SocieteData = SocieteProductionModel.omit({id: true, conventionCollectiveCode: true})
    const createSociete = await prisma?.societeProduction.create({
      data: {
        ...SocieteData.parse(data.societeProduction),
        ["conventionCollectiveCode"]: data.demandeur.conventionCollectiveCode,
      },
    });
    console.log('societe created')
  
    //HANDLE FINDING DEMANDEUR
    const demandeurFound = await prisma?.demandeur.findUnique({
      where: {
        email: data.demandeur.email,
      },
    });
    console.log("demandeur found : ", demandeurFound);
  
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
        statusNotification: "NOUVEAU",
        source: "FORM_EDS",
        externalId: data.dossier.id.toString()
      },
    });

    //HANDLE ENFANTS
    const EnfantsData = EnfantModel.omit({id: true, dossierId: true}).array()
    const CreateEnfants = await prisma?.enfant.createMany({
      data: EnfantsData.parse(data.enfants).map((enfant) => {return {...enfant, dossierId: createDossier.id}})
    })


    res.status(200).json({ message: "Dossier created successfully" });
  } catch (e) {
    console.log('error : ', e)
    res.status(500).json({error : e})
  }

};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as {
    dossier: DossierData;
    demandeur: Demandeur & { societeFound?: SocieteProduction };
    enfants: EnfantData[];
  };
  
  const uploadDossier = await prisma?.dossier.update({
    data: {
        statusNotification: "MIS_A_JOUR"
    },
    where: {
        externalId: data.dossier.id.toString()
    }
  })
  console.log("dossier to update : ", data);
};

export default withSentry(handler);
