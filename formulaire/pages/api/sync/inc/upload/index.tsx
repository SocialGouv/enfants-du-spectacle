import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import fsp from "fs/promises";
import { uploadFile } from "pages/api/docs/[id]";
import prisma from "../../../../../src/lib/prismaClient";
import { JustificatifEnfant } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler: NextApiHandler = async (req, res) => {
    if (req.method == "POST") {
      await sendDoc(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const sendDoc: NextApiHandler = async (req, res) => {

    console.log('------ INC FROM SDP ------')

    if(req.query.api_key !== process.env.API_KEY_SDP) {
        res.status(401).json({message: 'Unauthorized'})
    } else {

        const dossierId = getId(req);
        console.log('req : ', req)
        try {
            await fsp.readdir(`/mnt/docs-form/${dossierId}`);
        } catch (error) {
            await fsp.mkdir(`/mnt/docs-form/${dossierId}`);
        }
        const upload = await uploadFile(req, true);
        console.log('upload : ', upload)

        const data = {
            nom: upload.files.justificatif.originalFilename,
            enfantId: parseInt(req.query.enfantId as string),
            type: req.query.typeJustif as JustificatifEnfant,
            externalId: "",
            link: upload.files.justificatif.filepath + ".encrypted",
            statut: null
        }

        const pieceEnfant = await prisma.pieceDossierEnfant.create({data})
        console.log('piece enfant : ', pieceEnfant)
        //@ts-ignore
        res
            .status(200)
            .json({ filePath: upload.files.justificatif.filepath + ".encrypted" });

    }
};

export default withSentry(handler);