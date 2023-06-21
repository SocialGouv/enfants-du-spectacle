import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../src/lib/prismaClient";
import { Remuneration } from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
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
  const session = await getSession({ req });
  let data = JSON.parse(req.body) as Remuneration;
  try {
    const remuneration = await prisma.remuneration.create({ data });
    res.status(200).json(remuneration);
  } catch (e: unknown) {
    console.log(e);
  }
};

const remove: NextApiHandler = async (req, res) => {
  const enfantId = Number(req.body as string);
  try {
    console.log("ENFANT ID: ", enfantId);
    await prisma.remuneration.deleteMany({
      where: { enfantId: enfantId },
    });

    res.status(200).json({ message: "Rémunérations supprimées" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Rémunérations non trouvées" });
  }
};

export default withSentry(handler);
