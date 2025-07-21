import { withSentry } from "@sentry/nextjs";
import fsp from "fs/promises";
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

  const { type, dossier, to, attachment, statut, extraData } = parsed;
  let wording = _.find(WORDING_MAILING, { type: type });
  if (!wording) {
    res.status(400).end();
    return;
  }

  // Create a copy of wording to avoid mutating the original
  wording = { ...wording };

  if (type === "status_changed") {
    wording.subject = wording.subject.replace(
      "___DOSSIERID___",
      `n° ${dossier.id}`
    );
    wording.subject = wording.subject.replace(
      "___DOSSIER_NAME___",
      `n° ${dossier.nom}`
    );
    wording.subject = wording.subject.replace(
      "__STATUS__",
      `${statut.replace("_", " ")}`.toLocaleLowerCase()
    );
    wording.text = wording.text.replace(
      "__STATUS__",
      `${statut.replace("_", " ")}`.toLocaleLowerCase()
    ).replace(
      "__WARNING__",
      statut === "CONSTRUCTION" ? "Vous pouvez apporter les derniers éléments nécessaires à la complétion de votre dossier." : "Il n'est plus modifiable d'ici la commission.");
  }

  if (type === "piece_refused") {
    const { pieceName, enfantName, documentType } = extraData || {};
    
    // Replace basic placeholders
    wording.subject = wording.subject
      .replace("___DOSSIERID___", `n° ${dossier.id}`)
      .replace("___DOSSIER_NAME___", dossier.nom || "");
      
    wording.text = wording.text
      .replace("___DOSSIER_NAME___", dossier.nom || "")
      .replace("___PIECE_NAME___", pieceName || "");
      
    // Replace enfant info conditionally
    if (documentType === "enfant" && enfantName) {
      wording.text = wording.text.replace("___ENFANT_INFO___", ` pour l'enfant ${enfantName}`);
    } else {
      wording.text = wording.text.replace("___ENFANT_INFO___", "");
    }
  }

  if (type === "medical_document_uploaded") {
    const { enfantName, documentType } = extraData || {};
    
    wording.subject = wording.subject
      .replace("___DOSSIERID___", `n° ${dossier.id}`)
      .replace("___DOSSIER_NAME___", dossier.nom || "")
      .replace("___DOCUMENT_TYPE___", documentType || "avis médical");
      
    wording.text = wording.text
      .replace("___DOSSIER_NAME___", dossier.nom || "")
      .replace("___ENFANT_NAME___", enfantName || "")
      .replace("___DOCUMENT_TYPE___", documentType || "avis médical");
  }

  const templateSignin = (
    await fsp.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
  ).toString();

  function html({ url }: { url: string }): string {
    return templateSignin
      .replace("__TEXT__", wording!.text as string)
      .replace("__URL__", url)
      .replace("__BUTTON__", wording!.button as string)
      .replace("__TITLE__", wording!.title as string)
      .replace("__BYE__", wording!.bye as string);
  }

  function text({ url }: { url: string }) {
    return `test \n${url}\n`;
  }

  try {
    const url =
      type === "auth_access" || type === "status_changed"
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
      attachments: attachment
        ? [
            {
              // utf-8 string as an attachment
              filename: `Décision autorisation ${dossier.nom}.pdf`,
              path: attachment,
            },
          ]
        : "",
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
