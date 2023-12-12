import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as { id: string; api_key: string };

  //console.log('data received : ', data)
  if (data.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: parseInt(data.id as string),
      },
    });
    console.log("comments found : ", comments);
    res.status(200).json(comments);
  }
};

export default withSentry(handler);
