import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import { Role } from "@prisma/client";
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
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body as string);
  try {
    await client.user.create({ data });
  } catch (e: unknown) {
    console.log(e);
  }
  res.status(200).json({ message: "Utilisateur ajouté" });
};

const remove: NextApiHandler = async (req, res) => {
  const userId = Number(req.body as string);
  try {
    await client.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Utilisateur non trouvé" });
  }
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

  const userId = parsed.id;

  const updatedUser = await client.user.update({
    data: {
      departements: parsed.departements,
    },
    where: { id: userId },
  });

  res.status(200).json(superjson.stringify(updatedUser));
};

const get: NextApiHandler = async (req, res) => {
  const role: string = req.query.role as string;
  const allUsers =
    role == "all"
      ? await client.user.findMany({
          orderBy: { name: "asc" },
        })
      : await client.user.findMany({
          orderBy: { name: "asc" },
          where: { role: role.toUpperCase() as Role },
        });
  res.status(200).json(superjson.stringify(allUsers));
};

export default withSentry(handler);
