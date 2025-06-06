// @ts-nocheck
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as Sentry from "@sentry/nextjs";
import NextAuth from "next-auth";
import EmailAuthProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "../../../src/lib/emailAuth";
import type { NextAuthOptions } from "next-auth";
import client from "src/lib/prismaClient";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      session.dbUser = user; // Keep this for backward compatibility
      return session;
    },
    async signIn({ user }) {
      if (typeof user.email !== "string") return false;
      return true;
    },
  },
  logger: {
    error(code, metadata) {
      Sentry.captureException({ code, metadata });
    },
  },
  pages: {
    error: "/",
    signIn: "/login",
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
};

export default NextAuth(authOptions);
