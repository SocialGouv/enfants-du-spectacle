import fs from "fs";
import type { Awaitable } from "next-auth";
import nodemailer from "nodemailer";

const templateSignin = fs
  .readFileSync(`${process.cwd()}/src/mails/signin.html`)
  .toString();

function html({ url }: { url: string }): string {
  return templateSignin.replace("__URL__", url);
}

function text({ url }: { url: string }) {
  return `Connectez-vous à Enfants du Spectacle en suivant ce lien\n${url}\n`;
}

function sendLinkEmail({
  identifier: email,
  provider,
  url,
}: {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  // token: string;
}): Awaitable<void> {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;

    nodemailer.createTransport(server).sendMail(
      {
        from,
        html: html({ url }),
        subject: `Télécharger le dossier de la commission`,
        text: text({ url }),
        to: email,
      },
      (error: Error | null) => {
        if (error) {
          // logger.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

export { sendLinkEmail };
