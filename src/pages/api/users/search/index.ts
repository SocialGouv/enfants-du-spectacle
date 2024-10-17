import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import { client } from "src/lib/prismaClient";

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
  const departement = req.query.departement;
  if (typeof departement === "string") {
    const allUsers = await client.user.findMany({
      orderBy: { name: "asc" },
      where: {
        departements: {
          has: departement,
        },
      },
    });
    res.status(200).json(superjson.stringify(allUsers));
  } else {
    res
      .status(401)
      .json(superjson.stringify({ error: "No departement provided" }));
  }
};

export default withSentry(handler);
