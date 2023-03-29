import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient, User } from "@prisma/client";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getUserByEmail(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getUserByEmail: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const userEmail = req.query.email as string;
  console.log("email:", userEmail);
  try {
    let user: User | null = null;
    user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      console.log("create user: ", userEmail);
      const data = {
        email: userEmail as string,
      };
      user = await prisma.user.create({ data });
    }

    res.status(200).json(user.id);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default handler;
