import type { User } from "@prisma/client";
import { Commentaire } from "@prisma/client";
import type {
  CommentaireData,
  CommissionData,
  DossierData,
} from "src/lib/types";
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

function useCommentaires(dossierId: number | null) {
  const { data, error } = useSWR(
    dossierId ? `/api/commentaires?dossierId=${dossierId}` : null,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<CommentaireData[]>(await res.text());
    }
  );

  return {
    commentaires: data,
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

function getDataDS() {
  const { data, error } = useSWR(
    `/api/sync_ds`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(`/api/sync_ds`, {
        headers: {
          "authorization" : "Bearer test"
        },
        method: "GET",
      })
      console.log('OK JE RECUP')
      return superJSONParse<User[]>(await res.text());
    }
  );

  return {
    allDatas: data,
    isError: error,
    isLoading: !error && !data,
  };
}

type DatePeriod = "past" | "upcoming";
function useCommissions(
  datePeriod: DatePeriod | undefined = "upcoming",
  departement: string
) {
  const { data, error } = useSWR(
    `/api/commissions?datePeriod=${datePeriod}&departement=75`,
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

function useCommission(id: number | null) {
  const { data, error } = useSWR(
    id ? `/api/commissions/${id}` : null,
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

export {
  useAllUsers,
  useCommentaires,
  useCommission,
  useCommissions,
  useDossier,
  getDataDS
};
