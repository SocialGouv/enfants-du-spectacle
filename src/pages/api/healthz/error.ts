import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  throw new Error("on-purpose error server side");
};

export default withSentry(handler);
