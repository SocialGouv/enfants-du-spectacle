// DEBUG_SMTP_URL="smtp://username:password@smtp.tipimail.com:587" DEBUG_EMAIL_TO="test@email.fr" npm run send-test-mail

const nodemailer = require("nodemailer")

nodemailer
  .createTransport(
    process.env.DEBUG_SMTP_URL
  )
  .sendMail({
    from: "enfantsduspectacle@diffusion.fabrique.social.gouv.fr",
    subject: `Connexion à Enfants Du Spectacle TEST`,
    text: "Ceci est un test, le recois-tu ? Merci !",
    to: process.env.DEBUG_EMAIL_TO
  },
    (error) => {
      if (error) {
        console.log("error", error)
        reject(error);
        return;
      }
      resolve();
    }
  );
