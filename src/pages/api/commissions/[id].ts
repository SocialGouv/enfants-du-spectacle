import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
//import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  /*const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }*/
  const { id: commissionIdStr } = req.query;
  if (typeof commissionIdStr !== "string") {
    res.status(404).send(`not a valid commission id`);
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  console.log("je suis la");
  const id = getId(req);
  const commission = await prisma.commission.findUnique({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          enfants: true,
          societeProduction: true,
          user: true,
        },
        orderBy: { id: "desc" },
      },
    },
    where: { id },
  });
  console.log("commission : ", commission);

  res.status(200).json(superjson.stringify(commission));
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const updates: { lastSent?: Date; date?: Date; dateLimiteDepot?: Date } = {};

  if (parsed.lastSent !== null) {
    updates.lastSent = parsed.lastSent;
  }

  const updateCommission = await prisma.commission.update({
    data: updates,
    where: { id: parsed.id },
  });

  res.status(200).json(superjson.stringify(updateCommission));
};

export default withSentry(handler);
