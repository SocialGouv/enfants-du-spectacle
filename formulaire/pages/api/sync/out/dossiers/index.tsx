import { SocieteProduction } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DossierData, EnfantData } from "src/fetching/dossiers";
import { DemandeurData } from "src/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

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
  const data = JSON.parse(req.body) as {
    dossier: DossierData;
    demandeur: DemandeurData;
    societeProduction: SocieteProduction;
    enfants: EnfantData[];
  };

  if (
    data.dossier.statut === "BROUILLON" ||
    data.dossier.statut === "CONSTRUCTION"
  ) {
    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/dossiers`;
    const fetching = await fetch(url, {
      body: JSON.stringify(data),
      method: data.dossier.statut === "BROUILLON" ? "POST" : "PUT",
    }).then(async (r) => {
      if (!r.ok) {
        console.log("r : ", r.status);
        res.status(500).json({ error: `Something went wrong : ${r.status}` });
      }
      return r.json();
    });
    res.status(200).json({ message: fetching });
  } else {
    res.status(400).json({ message: "Bad status" });
  }
};

export default withSentry(handler);
