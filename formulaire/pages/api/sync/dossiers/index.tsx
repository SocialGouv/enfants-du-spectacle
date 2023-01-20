import { Demandeur, SocieteProduction } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { DossierData, EnfantData } from "src/fetching/dossiers";

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
    const data = JSON.parse(req.body) as {dossier: DossierData, demandeur: Demandeur & {societeFound?: SocieteProduction}, enfants: EnfantData[]}
    console.log('dossier to send : ', data)

    if(data.dossier.statut === "BROUILLON" || data.dossier.statut === "CONSTRUCTION") {
        const url = `${process.env.API_URL_INSTRUCTEUR}/dossiers`;
        const fetching = await fetch(url, {
            body: JSON.stringify(data),
            method: data.dossier.statut === "BROUILLON" ? "POST" : "PUT",
        }).then(async (r) => {
            if (!r.ok) {
            throw Error(`got status ${r.status}`);
            }
            return r.json();
        });
        res.status(200).json({message: fetching})
    } else {
        res.status(400).json({message: 'Bad status'})
    }
};

export default withSentry(handler);