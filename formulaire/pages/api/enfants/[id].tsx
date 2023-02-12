import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  console.log("ENFANT !");
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const remove: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const enfantId = getId(req);
    console.log(enfantId);
    const enfantDeleted = await prisma.enfant.delete({
      where: { id: enfantId },
    });
    res.status(200).json({ enfantDeleted });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Enfant non trouvé" });
  }
};

export default handler;
