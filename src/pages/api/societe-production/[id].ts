import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  const { id } = req.query;
  const societeId = Number(id);

  if (isNaN(societeId) || societeId <= 0) {
    res.status(400).json({ error: "Invalid societe production ID" });
    return;
  }

  if (req.method === "GET") {
    try {
      const societeProduction = await client.societeProduction.findUnique({
        where: { id: societeId },
      });

      if (!societeProduction) {
        res.status(404).json({ error: "Societe production not found" });
        return;
      }

      res.status(200).json(societeProduction);
    } catch (error) {
      console.error("Error fetching societe production:", error);
      res.status(500).json({ error: "Failed to fetch societe production" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withSentry(handler);
