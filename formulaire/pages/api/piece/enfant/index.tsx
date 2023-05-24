import { PieceDossierEnfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { generateToken } from "src/lib/utils";
import prisma from "../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
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
    const data = JSON.parse(req.body) as PieceDossierEnfant & {dossierId: number}
    const dossierId = data.dossierId
    delete data.dossierId
    try {
      const piece = await prisma.pieceDossierEnfant.create({ data });
      const tokenizedLink = generateToken(piece.id, dossierId, piece.type, piece.link, piece.statut)
      await prisma?.$disconnect()
      res.status(200).json({pieceDossier: piece, tokenizedLink: tokenizedLink});
    } catch (e: unknown) {
      await prisma?.$disconnect()
      console.log(e);
    }
};

export default withSentry(handler);