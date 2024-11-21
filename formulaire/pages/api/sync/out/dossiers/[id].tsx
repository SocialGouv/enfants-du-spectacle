import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions }  from '../../../auth/[...nextauth]'

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

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  try {
    const dossierId = req.query.id as string;

    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/dossiers/id=${dossierId}&token=${process.env.API_KEY_INSTRUCTEUR}`;

    const fetching = await fetch(url, {
      method: "GET",
    }).then(async (r) => {
      if (!r.ok) {
        console.log("r : ", r.status); // TODO: to be replaced by an error ?
      }
      return r.json();
    });

    res.status(200).json(fetching);
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ message: "Instructeur non trouvé" });
  }
};

export default withSentry(handler);
