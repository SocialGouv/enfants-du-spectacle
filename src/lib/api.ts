import type { User } from "@prisma/client";
import type { DossierData } from "src/lib/types";
import { parse as superJSONParse } from "superjson";
import useSWR from "swr";

function useDossier(id: number) {
  const { data, error } = useSWR(
    `/api/dossiers/${id}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<DossierData>(await res.text());
    }
  );

  return {
    dossier: data,
    isError: error,
    isLoading: !error && !data,
  };
}

function useAllUsers() {
  const { data, error } = useSWR(
    `/api/users`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<User[]>(await res.text());
    }
  );

  return {
    allUsers: data,
    isError: error,
    isLoading: !error && !data,
  };
}

export { useAllUsers, useDossier };
