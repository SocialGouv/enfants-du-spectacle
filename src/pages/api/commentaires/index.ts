import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import { client } from "src/lib/prismaClient";

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
  } else if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.dossierId as string);
}

const remove: NextApiHandler = async (req, res) => {
  const commentId = Number(req.body as string);
  try {
    await client.commentaire.delete({
      where: { id: commentId },
    });
    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Commentaire non trouve" });
  }
};

const get: NextApiHandler = async (req, res) => {
  const dossierId = getId(req);
  const allComments = await client.commentaire.findMany({
    include: {
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
  const data = JSON.parse(req.body as string);
  try {
    await client.commentaire.create({ data });
  } catch (e: unknown) {
    console.log(e);
  }
  res.status(200).json({ message: "Commentaire ajouté" });
};

export default withSentry(handler);
