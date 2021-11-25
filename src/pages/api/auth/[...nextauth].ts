import { PrismaAdapter } from "@next-auth/prisma-adapter";
import emailParser from "email-addresses";
import NextAuth from "next-auth";
import EmailAuthProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "src/lib/emailAuth";
import prisma from "src/lib/prismaClient";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn({ user }) {
      if (typeof user.email !== "string") return false;
      const parsed = emailParser.parseOneAddress(user.email);
      return !!(
        parsed &&
        "domain" in parsed &&
        (parsed.domain === "drieets.gouv.fr" ||
          parsed.domain === "beta.gouv.fr")
      );
    },
  },
  pages: {
    error: "/",
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
  secret: process.env.NEXTAUTH_SECRET,
});
