import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "GET") {
      await get(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {

    const siret = req.query.siret || ''
    console.log('token : ', process.env.TOKEN_SIRENE)

    let fetching = await fetch(`https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN_SIRENE}`,
            'Accept': 'application/json'
        }
    }).then(async (r) => {
      return r.json();
    });

    res.status(200).json(fetching);

};

export default withSentry(handler);