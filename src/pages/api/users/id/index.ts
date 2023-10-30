import type { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { getSession } from "next-auth/react";

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
  let userIds: number[] | number = [];

  if (req.query.id) {
    if (Array.isArray(req.query.id)) {
      userIds = req.query.id.map((id) => {
        return parseInt(id);
      });
    } else {
      userIds = parseInt(req.query.id);
    }
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
    await prisma?.$disconnect();
    res.status(200).json(users);
  } catch (e: unknown) {
    await prisma?.$disconnect();
    console.log(e);
  }
};

export default handler;
