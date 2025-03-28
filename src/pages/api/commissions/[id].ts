import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import superjson from "superjson";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
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
  const id = getId(req);
  const commission = await client.commission.findUnique({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          demandeur: true,
          enfants: true,
          societeProduction: true,
          user: true,
        },
        orderBy: { id: "desc" },
      },
    },
    where: { id },
  });

  res.status(200).json(commission);
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

  if (parsed.date !== null) {
    updates.date = parsed.date;
  }

  if (parsed.dateLimiteDepot !== null) {
    updates.dateLimiteDepot = parsed.dateLimiteDepot;
  }

  const updateCommission = await client.commission.update({
    data: updates,
    where: { id: parsed.id },
  });

  res.status(200).json(updateCommission);
};

export default withSentry(handler);
