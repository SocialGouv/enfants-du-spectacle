import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

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
  const commissions =
    datePeriod == "past"
      ? await getPastCommissions()
      : departements == "all"
      ? withChild == "true"
        ? await getUpcomingCommissionsNotEmpty(req)
        : await getUpcomingCommissions()
      : await getUpcomingCommissionsByDepartement(departements as string);
  await prisma?.$disconnect()
  res.status(200).json(superjson.stringify(commissions));
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body as string);
  try {
    await prisma?.commission.create({ data });
  } catch (e: unknown) {
    console.log(e);
  }
  res.status(200).json({ message: "Commission ajoutée" });
};

const remove: NextApiHandler = async (req, res) => {
  const commissionId = Number(req.body as string);
  try {
    await prisma?.commission.delete({
      where: { id: commissionId },
    });
    res.status(200).json({ message: "Commission supprimée" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Commission non trouvée" });
  }
};

const getUpcomingCommissions = async () => {
  console.log('upcoming')
  return prisma?.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
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
  console.log('upcoming not empty !!!')
  return await prisma?.commission.findMany({
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
          user: true,
          medecin: true,
          demandeur: true,
          enfants: {
            where: session?.dbUser.role !== "MEDECIN" ?
            {}
            :
            {
              typeConsultation: {
                equals: "THALIE"
              }
            }
          },
          piecesDossier: true,
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
  console.log('upcoming by departement')
  console.log("departements : ", departements.split(","));
  return prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          demandeur: true,
          societeProduction: true,
          user: true,
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

const getPastCommissions = async () => {
  console.log('past commissions')
  return prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
        },
      },
    },
    orderBy: { date: "desc" },
    where: { date: { lt: new Date() }, dossiers: { some: {} } },
  });
};

export default withSentry(handler);
