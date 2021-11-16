import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import emailParser from "email-addresses";
import NextAuth from "next-auth";
import EmailAuthProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "src/lib/emailAuth";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn({ user }) {
      if (typeof user.email !== "string") return false;
      const parsed = emailParser.parseOneAddress(user.email);
      const isAllowedToSignIn =
        parsed &&
        "domain" in parsed &&
        (parsed.domain === "drieets.gouv.fr" ||
          parsed.domain === "beta.gouv.fr");
      if (isAllowedToSignIn) return true;
      return false;
      // Or you can return a URL to redirect to: return '/unauthorized'
    },
  },
  pages: {
    signIn: "/",
    verifyRequest: "/verifyRequest",
  },
  providers: [
    EmailAuthProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
      server: {
        auth: {
          pass: process.env.EMAIL_SERVER_PASSWORD,
          user: process.env.EMAIL_SERVER_USER,
        },
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
      },
    }),
  ],
});
