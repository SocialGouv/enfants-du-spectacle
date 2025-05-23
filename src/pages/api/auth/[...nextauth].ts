// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { customPrismaAdapter } from "src/lib/customPrismaAdapter";
import * as Sentry from "@sentry/nextjs";
import NextAuth from "next-auth";
import EmailAuthProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "src/lib/emailAuth";
import prisma from "src/lib/prismaClient";

export default NextAuth({
  adapter: customPrismaAdapter(prisma),
  callbacks: {
    // Use type assertion to work around the type mismatch
    session({ session, user }: { session: any; user: any }) {
      session.dbUser = user;
      return session;
    },
    async signIn({ user }) {
      try {
        console.log('typeof prisma.user:', typeof prisma.user)
        console.log(Object.keys(prisma))
        const users = await prisma.user.findMany()
        console.log('users:', users)
      } catch (error) {
        console.error('❌ Erreur de connexion à la base de données :', error)
      }
      if (typeof user.email !== "string") return false;
      console.log('user : ', user)
      const test = await prisma.user.findUnique({
        where: { email: user.email },
      });
      console.log('test : ', test)
      return test != null;
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
    signOut: "/logout",
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
