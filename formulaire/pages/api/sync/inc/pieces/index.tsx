import { StatutDossier, STATUT_PIECE } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DossierData } from "src/fetching/dossiers";
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
    const data = JSON.parse(req.body) as {type: 'Enfant' | 'Dossier', id: string, statut: STATUT_PIECE, api_key: string}

    console.log('data received : ', data)

    if(data.api_key !== process.env.API_KEY_SDP) {
        res.status(401).json({ error: `Unauthorized` })
    } else {
        let piece = data.type === 'Dossier' ? await prisma.pieceDossier.update({
            data: {
                statut: data.statut
            },
            where: {
                id: parseInt(data.id)
            }
        }) : await prisma.pieceDossierEnfant.update({
            data: {
                statut: data.statut
            },
            where: {
                id: parseInt(data.id)
            }
        })
        console.log('piece trouvee : ', piece)
    }

    res.status(200).json({message: 'OK'})


};

export default withSentry(handler);