import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method == "GET") {
      await get(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {
    const data = JSON.parse(req.body)
    console.log('data to treat for docs : ', data)
    res.status(200).json({ message: "OK" });
};

export default withSentry(handler);