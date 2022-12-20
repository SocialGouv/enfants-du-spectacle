import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react";



const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    const { id: articleIdStr } = req.query;
    if (typeof articleIdStr !== "string") {
      res.status(404).send(`not a valid piece id`);
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
  const prisma = new PrismaClient()   
  try {
    const pieceId = getId(req);
    const dossierDeleted = await prisma.pieceDossier.delete({
      where: { id: pieceId }
    })
    res.status(200).json({ dossierDeleted });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Piece non trouvée" });
  }
};

  export default handler;