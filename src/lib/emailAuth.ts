import fs from "fs";
import _ from "lodash";
import type { Awaitable } from "next-auth";
import nodemailer from "nodemailer";
import { WORDING_MAILING } from "src/lib/helpers";

function text({ url }: { url: string }) {
  return `Connectez-vous à Enfants du Spectacle en suivant ce lien\n${url}\n`;
}

function sendVerificationRequest({
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
  const templateSignin = (
    fs.readFileSync(`${process.cwd()}/src/mails/mailgeneric.html`)
  ).toString();

  const type = url.includes("dl_commission") ? "dl_commission" : "auth";

  const wording = _.find(WORDING_MAILING, { type: type });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function html({ url }: { url: string }): string {
    return templateSignin
      .replace("__TEXT__", wording.text as string)
      .replace("__TITLE__", wording?.title as string)
      .replace("__URL__", url)
      .replace("__BUTTON__", wording.button as string)
      .replace("__BYE__", wording.bye as string);
  }

  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    const transport = nodemailer.createTransport(server);

    transport.sendMail(
      {
        from,
        to: email,
        subject: wording.subject,
        text: text({ url }),
        html: html({ url }),
      },
      (error, info) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'email :", error);
          reject(new Error(`Erreur SMTP : ${error.message}`));
          return;
        }

        // Vérifie que le mail n’a pas été rejeté silencieusement
        if (info.rejected && info.rejected.length > 0) {
          const reason = `Email rejeté par le serveur SMTP : ${info.rejected.join(", ")}`;
          console.error(reason);
          reject(new Error(reason));
          return;
        }

        resolve();
      }
    );
  });
}

export { sendVerificationRequest };
