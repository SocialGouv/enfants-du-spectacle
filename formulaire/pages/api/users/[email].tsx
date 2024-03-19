import type { NextApiHandler } from "next";
import { User } from "@prisma/client";
import { WORDING_MAILING } from "src/lib/helpers";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import fs from "fs";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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

    //SEND EMAIL
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

    if (!wording) {
      res.status(400).end();
      return;
    }

    const templateSignin = (
      await fs.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
    ).toString();

    const html = ({ url }: { url: string }): string => {
      return templateSignin
        .replace(
          "__TITLE__",
          (wording?.title + " «" + dossier.nom + "»") as string
        )
        .replace("__TEXT__", wording?.text as string)
        .replace("__URL__", url)
        .replace("__BUTTON__", wording?.button as string)
        .replace("__BYE__", wording?.bye as string);
    };

    const text = ({ url }: { url: string }) => {
      return `test \n${url}\n`;
    };

    const url = `${process.env.NEXTAUTH_URL}`;

    const transporter: Transporter = nodemailer.createTransport({
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
      subject: wording.subject,
      text: text({ url }),
      to: to,
    };

    const result: SMTPTransport.SentMessageInfo = await transporter.sendMail(
      options
    );

    res.status(200).json(user.id);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default handler;
