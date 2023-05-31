import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import { PrismaClient, Prisma } from '@prisma/client'
const client = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.commissionId as string);
}

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body as string);
  try {
    const sendList = await client.sendList.create({ data });
    res.status(200).json(superjson.stringify(sendList));
  } catch (e: unknown) {
    console.log(e);
  }
};

const get: NextApiHandler = async (req, res) => {
  const commissionId = getId(req);
  const sendList = await client.sendList.findMany({
    include: {
      user: true,
    },
    where: { commissionId: commissionId },
  });
  res.status(200).json(superjson.stringify(sendList));
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const updates: { lastSent?: Date; send?: boolean } = {};

  if (parsed.lastSent !== null) {
    updates.lastSent = parsed.lastSent;
  }

  if (parsed.send !== null) {
    updates.send = parsed.send;
  } else {
    updates.send = false;
  }

  const updateSendList = await client.sendList.update({
    data: updates,
    where: { id: parsed.id },
  });

  res.status(200).json(superjson.stringify(updateSendList));
};

export default withSentry(handler);
