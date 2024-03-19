import fsp from "fs/promises";
import _ from "lodash";
import type { Awaitable } from "next-auth";
import nodemailer from "nodemailer";
import { WORDING_MAILING } from "../../src/lib/helpers";

function text({ url }: { url: string }) {
  return `Connectez-vous au formulaire Enfants du Spectacle en suivant ce lien\n${url}\n`;
}

async function sendVerificationRequest({
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
    await fsp.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
  ).toString();

  const type = url.includes("dl_commission") ? "dl_commission" : "auth";

  const wording = _.find(WORDING_MAILING, { type: type });

  function html({ url }: { url: string }): string {
    return (
      templateSignin
        .replace("__TEXT__", wording?.text as string)
        .replace("__URL__", url)
        .replace("__BUTTON__", wording?.button as string)
        .replace("__TITLE__", wording?.title as string)
        .replace("__BYE__", wording?.bye as string)
    );
  }

  return new Promise((resolve, reject) => {
    const { server, from } = provider;

    nodemailer.createTransport(server).sendMail(
      {
        from,
        html: html({ url }),
        subject: wording?.subject,
        text: text({ url }),
        to: email,
      },
      (error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

export { sendVerificationRequest };