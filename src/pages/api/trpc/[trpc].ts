import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

export default createNextApiHandler({
  router: appRouter,
  createContext: async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
    const session = await getSession({ req });
    return {
      req,
      res,
      session,
    };
  },
});
