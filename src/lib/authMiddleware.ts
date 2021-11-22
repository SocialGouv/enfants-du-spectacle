import type { Session } from "@prisma/client";

type Middleware = (
  session: Session | null
) => { redirect: { destination: string; permanent: boolean } } | null;

const middleware: Middleware = (session) => {
  if (!session) {
    return {
      redirect: {
        destination: "/?signinRequired=true",
        permanent: false,
      },
    };
  }

  return null;
};

export default middleware;
