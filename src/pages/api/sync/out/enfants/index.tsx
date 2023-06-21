import { Enfant } from "@prisma/client";
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
      await passEnfant(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const passEnfant: NextApiHandler = async (req, res) => {

    const data = JSON.parse(req.body) as Enfant

    console.log('data received : ', data)

    const url = `${process.env.API_URL_SDP}/inc/enfants`;
    const fetching = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({...data, api_key: process.env.API_KEY_SDP})
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    res.status(200).json(fetching);

};

export default withSentry(handler);