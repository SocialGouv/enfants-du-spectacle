import { Demandeur } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { DemandeurModel } from "prisma/zod";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  const data = {};
  try {
    const demandeur = await prisma.demandeur.create({ data });
    res.status(200).json(demandeur);
  } catch (e: unknown) {
    console.log(e);
  }
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: Demandeur = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }
  const demandeurData = DemandeurModel.omit({ id: true });

  console.log("demandeur to update : ", demandeurData.parse(parsed));

  let dempandeurUpdated = await prisma.demandeur.update({
    data: { ...demandeurData.parse(parsed) },
    where: { id: parsed.id },
  });

  res.status(200).json(dempandeurUpdated);
};

export default withSentry(handler);
