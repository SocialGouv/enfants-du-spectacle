import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient, User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { number } from "zod";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getUserById(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getUserById: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  let collaboratorIds: number[] | number = [];

  if (req.query.id) {
    if (Array.isArray(req.query.id)) {
      collaboratorIds = req.query.id.map((id) => {
        return parseInt(id);
      });
    } else {
      collaboratorIds = parseInt(req.query.id);
    }
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: collaboratorIds,
        },
      },
    });
    res.status(200).json(users);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default handler;
