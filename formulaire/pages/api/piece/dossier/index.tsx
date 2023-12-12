import { PieceDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../src/lib/prismaClient";
import fs from "fs";
import { generateToken } from "src/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as PieceDossier;
  try {
    const piece = await prisma.pieceDossier.create({ data });
    const tokenizedLink = generateToken(
      piece.id,
      piece.dossierId,
      piece.type,
      piece.link,
      piece.statut
    );
    res.status(200).json({ pieceDossier: piece, tokenizedLink: tokenizedLink });
  } catch (e: unknown) {
    console.log(e);
  }
};

export default withSentry(handler);
