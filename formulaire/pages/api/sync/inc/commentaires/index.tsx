import { Comments } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    await update(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as { id: string; api_key: string };

  console.log("data received : ", data);
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

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as { comment: Comments; api_key: string };

  console.log("data received : ", data);
  if (data.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comment = await prisma.comments.create({
      data: data.comment,
    });
    console.log("comments created : ", comment);
    res.status(200).json(comment);
  }
};

const get: NextApiHandler = async (req, res) => {
  const data = req.query;
  let ids = data.externalId as string[];
  const externalIds = ids.map((id: string) => parseInt(id)) as number[];
  console.log("DOSSIERS IDS RECEIVED!!!! : ", data);

  if (data.token !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: {
          in: externalIds,
        },
      },
    });
    console.log("comments found : ", comments);
    res.status(200).json(comments);
  }
};

export default withSentry(handler);
