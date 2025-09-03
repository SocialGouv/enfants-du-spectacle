import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (
    !session ||
    (session.dbUser.role !== "ADMIN" &&
      session.dbUser.role !== "INSTRUCTEUR" &&
      session.dbUser.role !== "MEMBRE" &&
      session.dbUser.role !== "MEDECIN")
  ) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};
const get: NextApiHandler = async (req, res) => {
  const { datePeriod } = req.query;
  const { departements } = req.query;
  const { withChild } = req.query;
  const session = await getSession({ req });
  const commissions =
    datePeriod == "past"
      ? await getPastCommissions(session?.dbUser.role === "ADMIN")
      : departements == "all"
      ? withChild == "true"
        ? await getUpcomingCommissionsNotEmpty(req)
        : await getUpcomingCommissions()
      : await getUpcomingCommissionsByDepartement(departements as string);
  res.status(200).json(commissions);
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body as string);
  try {
    await client?.commission.create({ data });
  } catch (e: unknown) {
    console.log(e);
  }
  res.status(200).json({ message: "Commission ajoutée" });
};

const remove: NextApiHandler = async (req, res) => {
  const commissionId = Number(req.body as string);
  try {
    await client?.commission.delete({
      where: { id: commissionId },
    });
    res.status(200).json({ message: "Commission supprimée" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Commission non trouvée" });
  }
};

const getUpcomingCommissions = async () => {
  return client?.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          societeProduction: true,
          demandeur: {
            include: {
              societeProduction: true
            }
          },
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
    },
  });
};

const getUpcomingCommissionsNotEmpty = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  return await client?.commission.findMany({
    include: {
      dossiers: {
        where: session?.dbUser.role !== "MEDECIN" ? 
        {}
        :
        {
          enfants: {
            some: {
              typeConsultation: {
                equals: "THALIE"
              }
            }
          }
        },
        include: {
          _count: { 
            select: { 
              enfants: true
            } 
          },
          societeProduction: true,
          instructeur: true,
          medecin: true,
          demandeur: {
            include: {
              societeProduction: true
            }
          },
          enfants: {
            where: session?.dbUser.role !== "MEDECIN" ?
            {}
            :
            {
              typeConsultation: {
                equals: "THALIE"
              }
            },
            include: {
              piecesDossier: true
            }
          },
          piecesDossier: true,
          comments: true
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
      dossiers: {
        some: session?.dbUser.role !== "MEDECIN" ? 
          {}
        :
          {
            enfants: {
              some: {
                typeConsultation: {
                  equals: "THALIE"
                }
              }
            }
          }
      }
    },
  })
};

const getUpcomingCommissionsByDepartement = async (departements: string) => {
  return client.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          demandeur: {
            include: {
              societeProduction: true
            }
          },
          societeProduction: true,
          instructeur: true,
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
      departement: {
        in: departements.split(","),
      },
      dossiers: { some: {} },
    },
  });
};

const getPastCommissions = async (isAdmin: boolean) => {
  const where: Prisma.CommissionWhereInput = {
    date: { lt: new Date() },
    dossiers: { some: {} },
    // Pour les non-admins, on exclut les commissions archivées
    ...(isAdmin ? {} : { archived: { not: true } }),
  };

  return client.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          societeProduction: true,
          demandeur: { include: { societeProduction: true } },
        },
      },
    },
    orderBy: { date: "desc" },
    where,
  });
};

export default withSentry(handler);
