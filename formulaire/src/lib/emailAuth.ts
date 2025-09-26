import fsp from "fs/promises";
import _ from "lodash";
import nodemailer from "nodemailer";
import { WORDING_MAILING } from "../../src/lib/helpers";
import { emailNonceStore } from "../../pages/api/auth/prepare-login";

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
  provider: any;
  // token: string;
}): Promise<void> {
  // Récupérer le nonce depuis le store temporaire
  const nonce = emailNonceStore.get(email);
  
  console.log(`[SEND VERIFICATION] Email: ${email}, Nonce trouvé: ${nonce ? 'OUI' : 'NON'}`);
  console.log(`[SEND VERIFICATION] Store contient:`, Array.from(emailNonceStore.keys()));
  
  // Si pas de nonce, on envoie un email classique (sans protection)
  let secureUrl = url;
  if (nonce) {
    // Ajouter le nonce à l'URL du lien magic
    const urlWithNonce = new URL(url);
    urlWithNonce.searchParams.set('nonce', nonce);
    secureUrl = urlWithNonce.toString();
    
    console.log(`[SEND VERIFICATION] URL avec nonce: ${secureUrl}`);
    
    // Supprimer le nonce du store après utilisation
    emailNonceStore.delete(email);
  } else {
    console.log(`[SEND VERIFICATION] Aucun nonce trouvé pour ${email}, URL classique: ${secureUrl}`);
  }

  const templateSignin = (
    await fsp.readFile(`${process.cwd()}/src/mails/mailgeneric.html`)
  ).toString();

  const type = url.includes("dl_commission") ? "dl_commission" : "auth";

  const wording = _.find(WORDING_MAILING, { type: type });

  if (!wording) {
    throw new Error(`Wording not found for type: ${type}`);
  }

  function html({ url }: { url: string }): string {
    if (!wording) {
      throw new Error(`Wording not found for type: ${type}`);
    }
    return (
      templateSignin
        .replace("__TEXT__", wording.text as string)
        .replace("__URL__", url)
        .replace("__BUTTON__", wording.button as string)
        .replace("__TITLE__", wording.title as string)
        .replace("__BYE__", wording.bye as string)
    );
  }

  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    const transport = nodemailer.createTransport(server);

    transport.sendMail(
      {
        from,
        to: email,
        subject: wording.subject,
        text: text({ url: secureUrl }),
        html: html({ url: secureUrl }),
      },
      (error: any, info: any) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'email :", error);
          reject(new Error(`Erreur SMTP : ${error.message}`));
          return;
        }

        // Vérifie que le mail n'a pas été rejeté silencieusement
        if (info.rejected && info.rejected.length > 0) {
          const reason = `Email rejeté par le serveur SMTP : ${info.rejected.join(", ")}`;
          console.error(reason);
          reject(new Error(reason));
          return;
        }

        console.log(`[EMAIL AUTH] Email avec nonce envoyé pour ${email}`);
        resolve();
      }
    );
  });
}

export { sendVerificationRequest };
