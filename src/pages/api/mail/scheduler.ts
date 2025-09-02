import { withSentry } from "@sentry/nextjs";
import fsp from "fs/promises";
import _ from "lodash";
import type { NextApiHandler } from "next";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { WORDING_MAILING } from "src/lib/helpers";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

const handler: NextApiHandler = async (req, res) => {
  console.log(`[MAIL-SCHEDULER] ${new Date().toISOString()} - Received ${req.method} request`);
  
  // Pas de vérification de session pour le scheduler
  // On peut ajouter une vérification d'IP ou de token si nécessaire
  
  if (req.method !== "POST") {
    console.log(`[MAIL-SCHEDULER] Method ${req.method} not allowed`);
    res.status(405).end();
    return;
  }

  await sendMail(req, res);
};

const sendMail: NextApiHandler = async (req, res) => {
  console.log(`[MAIL-SCHEDULER] Processing mail request`);
  console.log(`[MAIL-SCHEDULER] Request body type: ${typeof req.body}`);
  
  let parsed;
  
  // Handle both string and object body types
  if (typeof req.body === "string") {
    try {
      parsed = JSON.parse(req.body);
      console.log(`[MAIL-SCHEDULER] Parsed JSON from string:`, parsed);
    } catch (error) {
      console.log(`[MAIL-SCHEDULER] JSON parse error:`, error);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }
  } else if (typeof req.body === "object" && req.body !== null) {
    parsed = req.body;
    console.log(`[MAIL-SCHEDULER] Using object body directly:`, parsed);
  } else {
    console.log(`[MAIL-SCHEDULER] Invalid body type: ${typeof req.body}`);
    res.status(400).json({ error: "Invalid body type" });
    return;
  }

  if (!parsed) {
    console.log(`[MAIL-SCHEDULER] Parsed body is null/undefined`);
    res.status(400).json({ error: "Empty body" });
    return;
  }

  const { type, dossier, to, attachment, statut, extraData } = parsed;
  console.log(`[MAIL-SCHEDULER] Mail type: ${type}, to: ${to}, dossier: ${dossier?.nom}`);
  
  let wording = _.find(WORDING_MAILING, { type: type });
  if (!wording) {
    console.log(`[MAIL-SCHEDULER] No wording found for type: ${type}`);
    console.log(`[MAIL-SCHEDULER] Available types:`, WORDING_MAILING.map(w => w.type));
    res.status(400).json({ error: `No wording found for type: ${type}` });
    return;
  }

  console.log(`[MAIL-SCHEDULER] Found wording for type: ${type}`);

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

  if (type === "new_comments_notification") {
    const { commentCount } = extraData || {};
    
    wording.subject = wording.subject
      .replace("___DOSSIER_NAME___", dossier.nom || "");
      
    wording.text = wording.text
      .replace("___DOSSIER_NAME___", dossier.nom || "")
      .replace("___COMMENT_COUNT___", commentCount?.toString() || "0");
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
    res.status(200).json({ message: "Send Mail : ", result });
  } catch (error: unknown) {
    console.error("Error sending mail:", error);
    res.status(400).json({ error: "Failed to send mail" });
  }
};

export default withSentry(handler);
