import type { NextApiHandler } from "next";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";
import client from "src/lib/prismaClient";
import { WORDING_MAILING } from "src/lib/helpers";
import nodemailer from "nodemailer";
import fsp from "fs/promises";
import _ from "lodash";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await getUserByEmail(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getUserByEmail: NextApiHandler = async (req, res) => {
  const userEmail = req.query.email as string;
  try {
    let user: User | null = null;
    user = await client.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      const data = {
        email: userEmail as string,
      };
      user = await client.user.create({ data });
    }

    // Send email notification
    if (typeof req.body !== "string") {
      res.status(400).end();
      return;
    }

    const parsed = JSON.parse(req.body);
    if (!parsed) {
      res.status(400).end();
      return;
    }

    const dossier = parsed;
    const type = "share_dossier";
    const to = userEmail;

    const wording = _.find(WORDING_MAILING, { type: type });

    if (wording) {
      try {
        const templateSignin = (
          await fsp.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
        ).toString();

        const html = ({ url }: { url: string }): string => {
          return templateSignin
            .replace("__TITLE__", wording.title)
            .replace(
              "__TEXT__",
              wording.text.replace("___DOSSIER_NAME___", dossier.nom)
            )
            .replace("__URL__", url)
            .replace("__BUTTON__", wording.button)
            .replace("__BYE__", wording.bye);
        };

        const text = ({ url }: { url: string }) => {
          return `${wording.text.replace("___DOSSIER_NAME___", dossier.nom)}\n${url}\n`;
        };

        const url = `${process.env.NEXT_PUBLIC_URL_SDP}/dossier/${dossier.id}`;

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT) || 0,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        });

        const options = {
          from: process.env.EMAIL_FROM,
          html: html({ url }),
          subject: wording.subject.replace("___DOSSIER_NAME___", dossier.nom),
          text: text({ url }),
          to: to,
        };

        await transporter.sendMail(options);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Ne pas faire échouer toute la requête si l'email ne part pas
      }
    }

    res.status(200).json(user.id);
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
