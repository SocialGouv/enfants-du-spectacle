import { Dossier, Prisma, StatutDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { STATUS_EN_COURS, STATUS_TERMINES } from "src/lib/helpers";
import { statusGroup } from "src/lib/types";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
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
  const session = await getSession({ req });
  const numberByPage = 10
  const page = req.query.page ? ((parseInt(req.query.page as string) - 1) * numberByPage)  : 0;
  const termToOrder = req.query.termToOrder as keyof Dossier
  const order= req.query.order as 'asc' | 'desc'
  const status = req.query.status as statusGroup

  const orderBy: Prisma.Enumerable<Prisma.DossierOrderByWithRelationInput> = {}
  orderBy[termToOrder] = order

  try {
    const dossiers = await prisma.dossier.findMany({
      include: {
        user: true,
        enfants: true,
        Demandeur: true
      },
      skip: page,
      take: numberByPage,
      where: {
        AND: [
          {
            userId: session?.dbUser.id
          },
          {
            nom: {
              contains: req.query.search as string,
              mode: "insensitive",
            }
          },
          {
            statut: {
              in: status === 'enCours' && STATUS_EN_COURS as StatutDossier[] || STATUS_TERMINES as StatutDossier[]
            }
          }
        ]
      },
      orderBy: [orderBy]
    });
    const countCurrent = await prisma.dossier.count({
      where: {
        AND: [
          {userId: session?.dbUser.id},
          {statut: {
            in: status === 'enCours' && STATUS_EN_COURS as StatutDossier[] || STATUS_TERMINES as StatutDossier[]
          }}
        ]
      }
    });
    const countEnCours = await prisma.dossier.count({
      where: {
        AND: [
          {userId: session?.dbUser.id},
          {statut: {
            in: STATUS_EN_COURS as StatutDossier[]
          }}
        ]
      }
    });
    const countTermines = await prisma.dossier.count({
      where: {
        AND: [
          {userId: session?.dbUser.id},
          {statut: {
            in: STATUS_TERMINES as StatutDossier[]
          }}
        ]
      }
    });
    res.status(200).json({dossiers: dossiers, countCurrent: countCurrent, countEnCours: countEnCours, countTermines: countTermines});
  } catch (e: unknown) {
    console.log(e);
  }
}

const post: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    const parsed: Dossier = JSON.parse(req.body);
    const data = {
      userId: session?.dbUser.id,
      dateDerniereModification: new Date(),
      demandeurId: parsed.demandeurId,
      nom: ''
    }
    console.log('data : ', data)
    try {
      const dossier = await prisma.dossier.create({ data });
      res.status(200).json(dossier);
    } catch (e: unknown) {
      console.log(e);
    }
};

const update: NextApiHandler = async (req, res) => {

  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: Dossier = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  delete parsed.user;
  delete parsed.enfants;
  delete parsed.Demandeur;

  console.log('parsed : ', parsed)

  const produitupdated = await prisma.dossier.update({
    data: parsed,
    where: { id: parsed.id },
  })

  res.status(200).json(produitupdated);
};

export default withSentry(handler);