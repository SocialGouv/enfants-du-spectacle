import { Comments } from "@prisma/client";
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
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {
  const dossierId = req.query.dossierId as string
  try {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: parseInt(dossierId)
      }
    })
    res.status(200).json(comments)
  } catch(e: unknown) {
    console.log(e)
  }
};

const post: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    let data = JSON.parse(req.body) as Comments
    //@ts-ignore
    data.userId = session?.dbUser.id
    console.log('comment to create : ', data)
    try {
      const comment = await prisma.comments.create({ data });
      res.status(200).json(comment);
    } catch (e: unknown) {
      console.log(e);
    }
};

export default withSentry(handler);