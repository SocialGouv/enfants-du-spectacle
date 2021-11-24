import type { User } from "@prisma/client";
import type { CommissionData, DossierData } from "src/lib/types";
import { parse as superJSONParse } from "superjson";
import useSWR from "swr";

function useDossier(id: number | null) {
  const { data, error } = useSWR(
    id ? `/api/dossiers/${id}` : null,
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

type DatePeriod = "past" | "upcoming";
function useCommissions(datePeriod: DatePeriod | undefined = "upcoming") {
  const { data, error } = useSWR(
    `/api/commissions?datePeriod=${datePeriod}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<CommissionData[]>(await res.text());
    }
  );

  return {
    commissions: data,
    isError: error,
    isLoading: !error && !data,
  };
}

function useCommission(id: number) {
  const { data, error } = useSWR(
    `/api/commissions/${id}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<CommissionData>(await res.text());
    }
  );

  return {
    commission: data,
    isError: error,
    isLoading: !error && !data,
  };
}

export { useAllUsers, useCommission, useCommissions, useDossier };
