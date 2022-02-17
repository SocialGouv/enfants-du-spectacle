import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};
const get: NextApiHandler = async (req, res) => {
  const { datePeriod } = req.query;
  const { departement } = req.query;
  const { withChild } = req.query;
  console.log("commissions...", withChild);
  const commissions =
    datePeriod == "past"
      ? await getPastCommissions()
      : departement == "all"
      ? withChild == "true"
        ? await getUpcomingCommissionsNotEmpty()
        : await getAllCommissions()
      : await getUpcomingCommissionsByDepartement(departement);
  res.status(200).json(superjson.stringify(commissions));
};

const remove: NextApiHandler = async (req, res) => {
  const commissionId = Number(req.body as string);
  try {
    await prisma.commission.delete({
      where: { id: commissionId },
    });
    res.status(200).json({ message: "Commission supprimée" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Commission non trouvée" });
  }
};

const getAllCommissions = async () => {
  console.log("get all");
  return prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
  });
};

const getUpcomingCommissionsNotEmpty = async () => {
  console.log("get not empty");
  return prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          societeProduction: true,
          user: true,
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
      dossiers: { some: {} },
    },
  });
};

const getUpcomingCommissionsByDepartement = async (departement: string) => {
  return prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          societeProduction: true,
          user: true,
        },
        orderBy: { id: "desc" },
      },
    },
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
      departement: departement,
      dossiers: { some: {} },
    },
  });
};

const getPastCommissions = async () => {
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
