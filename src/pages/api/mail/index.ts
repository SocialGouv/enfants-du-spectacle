import { withSentry } from "@sentry/nextjs";
import fs from "fs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { WORDING_MAILING } from "src/lib/helpers";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
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

  const { type } = parsed;
  const wording = _.find(WORDING_MAILING, { type: type });
  if (!wording) {
    res.status(400).end();
    return;
  }

  const templateSignin = fs
    .readFileSync(`${process.cwd()}/src/mails/mailgeneric.html`)
    .toString();

  function html({ url }: { url: string }): string {
    return templateSignin
      .replace("__TEXT__", wording.text as string)
      .replace("__COMMISSION__", "a remplacer")
      .replace("__URL__", url);
  }

  function text({ url }: { url: string }) {
    return `test \n${url}\n`;
  }

  try {
    const url = "https://test.com";

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
      subject: `Lien download dossiers commission ...`,
      text: text({ url }),
      to: "y.lebars@numericite.eu",
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
