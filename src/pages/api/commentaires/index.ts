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

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.dossierId as string);
}

const get: NextApiHandler = async (req, res) => {
  const dossierId = getId(req);
  const allComments = await prisma.commentaire.findMany({
    include: {
      dossier: true,
      user: true,
    },
    orderBy: { date: "asc" },
    where: {
      dossierId: dossierId,
    },
  });
  res.status(200).json(superjson.stringify(allComments));
};

const post: NextApiHandler = async (req, res) => {
  const { text, date, userId, user, dossierId, dossier } = req.body;
  await prisma.commentaire.create({
    data: {
      date,
      dossierId,
      text,
      userId,
    },
  });
  res.status(200).json({ message: "Commentaire ajouté" });
};

export default withSentry(handler);
