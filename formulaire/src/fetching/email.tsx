import { Dossier } from "@prisma/client";

const sendEmail = (
  type: string,
  attachment?: string,
  dossier?: Dossier,
  to?: string
) => {
  window
    .fetch(`/api/mail/`, {
      body: JSON.stringify({
        attachment: attachment ? attachment : null,
        dossier: dossier ? dossier : null,
        to: to ? to : null,
        type: type,
      }),
      method: "POST",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

export { sendEmail };
