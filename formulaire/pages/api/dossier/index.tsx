import { Dossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "POST") {
      await post(req, res);
    } else if (req.method == "GET") {
      await get(req, res);
    } else if (req.method == "PUT") {
      await update(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  try {
    const dossiers = await prisma.dossier.findMany({
      include: {
        user: true,
        enfants: true,
      },
      where: {userId: session?.dbUser.id}
    });
    res.status(200).json(dossiers);
  } catch (e: unknown) {
    console.log(e);
  }
}

const post: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    const data = {
      userId: session?.dbUser.id,
      dateDerniereModification: new Date()
    }
    console.log('data : ', data)
    try {
      const dossier = await prisma.dossier.create({ data });
      res.status(200).json(dossier);
    } catch (e: unknown) {
      console.log(e);
    }
};

const update: NextApiHandler = async (req, res) => {

  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: Dossier = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  delete parsed.user;
  delete parsed.enfants;

  console.log('parsed : ', parsed)

  const produitupdated = await prisma.dossier.update({
    data: parsed,
    where: { id: parsed.id },
  })

  res.status(200).json(produitupdated);
};

export default withSentry(handler);