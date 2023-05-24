import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {

  const data = JSON.parse(req.body) as Enfant & {externalId: string};

  console.log('data received : ', data)

  try {
    const update = await prisma.enfant.update({
        data: {
            dateConsultation: data.dateConsultation
        },
        where: {
            id: parseInt(data.externalId)
        }
    })
    console.log('update : ', update)
    res.status(200).json(update);
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
    console.log(e)
  }

};

export default withSentry(handler);
