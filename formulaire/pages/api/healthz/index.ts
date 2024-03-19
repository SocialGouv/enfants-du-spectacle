import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  res.status(200).json({ all: "good" });
};

export default handler;

