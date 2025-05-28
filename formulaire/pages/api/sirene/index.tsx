import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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

    let fetching = await fetch(`https://api.insee.fr/entreprises/sirene/V3.11/siret/${siret}`,{
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