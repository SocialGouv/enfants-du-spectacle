import { withSentry } from "@sentry/nextjs";
import fs from "fs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { WORDING_MAILING } from "src/lib/helpers";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

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

  const { type, dossier, to, attachment } = parsed;
  const wording = _.find(WORDING_MAILING, { type: type });
  if (!wording) {
    res.status(400).end();
    return;
  }

  /*const search = await searchUsers(
    prisma,
    "MEMBRE",
    commission.departement as string
  );
  const sendTo = search?.map((user) => {
    return user.email;
  });*/

  const templateSignin = fs
    .readFileSync(`${process.cwd()}/src/mails/mailgeneric.html`)
    .toString();

  function html({ url }: { url: string }): string {
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
    const url =
      type === "auth_access"
        ? `${process.env.URL_SDP}`
        : `${process.env.NEXTAUTH_URL}`;

    const transporter: Transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.EMAIL_SERVER_PASSWORD,
        user: process.env.EMAIL_SERVER_USER,
      },
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
    });

    const options = {
      attachments: [
        {
          // utf-8 string as an attachment
          filename: `Décision autorisation ${dossier.nom}.pdf`,
          path: attachment,
        },
      ],
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
