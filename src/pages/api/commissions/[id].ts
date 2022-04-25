import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  const { id: commissionIdStr } = req.query;
  if (typeof commissionIdStr !== "string") {
    res.status(404).send(`not a valid commission id`);
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
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

  res.status(200).json(superjson.stringify(commission));
};

export default withSentry(handler);
