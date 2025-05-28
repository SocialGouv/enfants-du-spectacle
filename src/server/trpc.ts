import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  session: any;
}

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
