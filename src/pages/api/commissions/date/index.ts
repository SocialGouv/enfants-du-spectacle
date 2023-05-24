import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};
const get: NextApiHandler = async (req, res) => {
  const commissions = await getUpcomingCommissions();
  await prisma?.$disconnect()
  res.status(200).json(superjson.stringify(commissions));
};

const getUpcomingCommissions = async () => {
  return prisma.commission.findMany({
    orderBy: { date: "asc" },
    where: {
      date: { gte: new Date() },
    },
  });
};

export default withSentry(handler);
