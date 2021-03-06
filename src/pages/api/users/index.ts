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
    await prisma.user.create({ data });
  } catch (e: unknown) {
    console.log(e);
  }
  res.status(200).json({ message: "Utilisateur ajouté" });
};

const remove: NextApiHandler = async (req, res) => {
  const userId = Number(req.body as string);
  try {
    await prisma.user.delete({
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

  const updatedUser = await prisma.user.update({
    data: {
      departements: parsed.departements,
    },
    where: { id: userId },
  });

  res.status(200).json(superjson.stringify(updatedUser));
};

const get: NextApiHandler = async (req, res) => {
  const role = req.query.role;
  const allUsers =
    role == "all"
      ? await prisma.user.findMany({
          orderBy: { name: "asc" },
        })
      : await prisma.user.findMany({
          orderBy: { name: "asc" },
          where: { role: "INSTRUCTEUR" },
        });
  res.status(200).json(superjson.stringify(allUsers));
};

export default withSentry(handler);
