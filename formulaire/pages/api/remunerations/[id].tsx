import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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

const remove: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const remunerationId = Number(req.body as string);
  try {
    console.log("remunerationId: ", remunerationId);
    await prisma.remuneration.delete({
      where: { id: remunerationId },
    });

    res.status(200).json({ message: "Rémunération supprimée" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Rémunération non trouvée" });
  }
};

export default handler;
