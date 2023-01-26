import { Demandeur, SocieteProduction, StatutDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import dossier from "pages/api/dossier";
import { DossierData, EnfantData } from "src/fetching/dossiers";
import { DemandeurData } from "src/lib/types";

const handler: NextApiHandler = async (req, res) => {
    if (req.method == "PUT") {
      await update(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const update: NextApiHandler = async (req, res) => {
    const data = JSON.parse(req.body) as {dossier: DossierData & {externalId: string}, statut: StatutDossier}
    try {
        const changeStatus = await prisma?.dossier.update({
            data: {
                statut: data.statut
            },
            where: {
                id: parseInt(data.dossier.externalId)
            }
        })
        res.status(200).json({ message: "Dossier created successfully" });

    } catch (e) {
        console.log('error : ', e)
        res.status(500).json({error : e})
    }

};

export default withSentry(handler);