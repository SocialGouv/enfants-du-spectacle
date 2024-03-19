import { withSentry } from "@sentry/nextjs";
import fsp from "fs/promises";
import _ from "lodash";
import type { NextApiHandler } from "next";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { WORDING_MAILING } from "src/lib/helpers";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "POST") {
    await sendMail(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const sendMail: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const { type, dossier, to } = parsed;
  const wording = _.find(WORDING_MAILING, { type: type });
  if (!wording) {
    res.status(400).end();
    return;
  }

  const templateSignin = (
    await fsp.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
  ).toString();

  function html({ url }: { url: string }): string {
    if (type === "update_dossier" || type === "depot_dossier") 
    {      
      wording.text = wording.text.replace("___DOSSIERID____", "n° " + dossier.id)
    }
    return templateSignin
      .replace("__TEXT__", wording.text as string)
      .replace("__URL__", url)
      .replace("__BUTTON__", wording.button as string)
      .replace("__TITLE__", wording.title as string)
      .replace("__BYE__", wording.bye as string);
  }

  function text({ url }: { url: string }) {
    return `test \n${url}\n`;
  }

  try {
    const url =`${process.env.NEXTAUTH_URL}`

    const transporter: Transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.EMAIL_SERVER_PASSWORD,
        user: process.env.EMAIL_SERVER_USER,
      },
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
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
    res.status(200).end(JSON.stringify({ message: "Send Mail : ", result }));
  } catch (error: unknown) {
    res.status(400);
  }
};

export default withSentry(handler);
