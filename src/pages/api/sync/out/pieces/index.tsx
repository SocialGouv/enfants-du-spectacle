import { STATUT_PIECE } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "PUT") {
      await updatePiece(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const updatePiece: NextApiHandler = async (req, res) => {

    const data = JSON.parse(req.body) as {type: 'Enfant' | 'Dossier', id: string, statut: STATUT_PIECE}

    console.log('data received : ', data)

    const url = `${process.env.API_URL_SDP}/inc/pieces`;
    const fetching = await fetch(url, {
        body: JSON.stringify({...data, api_key: process.env.API_KEY_SDP}),
        method: "PUT",
    }).then(async (r) => {
        if (!r.ok) {
            console.log('r : ', r.status)
            res.status(500).json({ error: `Something went wrong : ${r.status}` })
        }
        return r.json();
    });
    res.status(200).json({message: fetching})

};

export default withSentry(handler);