import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { PrismaClient, Prisma } from '@prisma/client'
const client = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const departement = req.query.departement;
  const commissions = await client.commission.findMany({
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
      departement: departement as string,
    },
  });
  res.status(200).json(commissions);
};

export default withSentry(handler);
