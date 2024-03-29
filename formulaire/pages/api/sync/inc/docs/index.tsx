import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    await get(req, res);
  }
  if (req.method == "DELETE") {
    await deleteDoc(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const deleteDoc: NextApiHandler = async (req, res) => {
  const docId = req.query.id;
  const token = req.query.token;

  if (token !== process.env.API_KEY_SDP) {
    res.status(500).json({ message: "Unauthorized" });
  } else {
    try {
      const deleteDocument = await prisma.pieceDossierEnfant.delete({
        where: {
          id: parseInt(docId as string),
        },
      });
      res.status(200).json(deleteDocument);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(e);
    }
  }
};

const get: NextApiHandler = async (req, res) => {
  const externalId = req.query.externalId;
  const token = req.query.token;

  var jwt = require("jsonwebtoken");

  if (token !== process.env.API_KEY_SDP) {
    res.status(500).json({ message: "Unauthorized" });
  } else {
    const dossier = await prisma.dossier.findUnique({
      where: {
        id: parseInt(externalId as string),
      },
      include: {
        piecesDossier: true,
        enfants: {
          include: {
            piecesDossier: true,
          },
        },
      },
    });
    res.status(200).json({
      dossier: {
        id: dossier?.id,
        piecesDossier: dossier?.piecesDossier.map((piece) => {
          let payload = {
            iat: new Date().getTime() / 1000,
            id: piece.id,
            dossierId: dossier.id,
            path: piece.link,
          };
          let tokenSDP = jwt.sign({ ...payload }, process.env.SECRET_KEY_DOCS, {
            expiresIn: 60 * 30,
          });
          return {
            id: piece.id,
            nom: piece.nom,
            type: piece.type,
            statut: piece.statut,
            link: `${process.env.NEXTAUTH_URL}/docs?token=${tokenSDP}`,
          };
        }),
      },
      enfants: dossier?.enfants.map((enfant) => {
        return {
          id: enfant.id,
          piecesDossier: enfant.piecesDossier.map((piece) => {
            let payload = {
              iat: new Date().getTime() / 1000,
              id: piece.id,
              dossierId: dossier.id,
              path: piece.link,
            };
            let tokenSDP = jwt.sign(
              { ...payload },
              process.env.SECRET_KEY_DOCS,
              { expiresIn: 60 * 30 }
            );
            return {
              id: piece.id,
              nom: piece.nom,
              type: piece.type,
              statut: piece.statut,
              link: `${process.env.NEXTAUTH_URL}/docs?token=${tokenSDP}`,
            };
          }),
        };
      }),
    });
  }
};

export default withSentry(handler);
