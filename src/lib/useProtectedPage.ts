import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useProtectedPage = (): { loading: boolean; session: Session | null } => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !session)
      router.push("/?signinRequired=true").catch((e) => {
        throw e;
      });
  }, [session, loading]);

  return { loading, session };
};

export default useProtectedPage;
