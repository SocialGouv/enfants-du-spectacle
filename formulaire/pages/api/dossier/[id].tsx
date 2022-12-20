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
      res.status(404).send(`not a valid dosarticlesier id`);
      return;
    }
  
    if (req.method == "GET") {
      await get(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

function getId(req: NextApiRequest): number {
    return Number(req.query.id as string);
  }
  
  const get: NextApiHandler = async (req, res) => {
    const prisma = new PrismaClient()   
    try {
      const dossierId = getId(req);
      const dossier = await prisma.dossier.findUnique({
        include: {
          user: true,
          enfants: {
            include: {
              piecesDossier: true
            }
          },
          Demandeur: true ,
          piecesDossier: true
        },
        where: { id: dossierId }
      });
      console.log('dossier return : ', dossier)
      res.status(200).json(dossier);
    } catch (e: unknown) {
      console.log(e);
      res.status(200).json({ message: "Dossier non trouvé" });
    }
  };

  export default handler;