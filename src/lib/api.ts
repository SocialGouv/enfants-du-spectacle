import type { PieceDossierEnfant, User } from "@prisma/client";
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

function useAllUsers(role: string | undefined = "all") {
  const { data, error } = useSWR(
    `/api/users?role=${role}`,
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

function useDataDS() {
  const { data, error } = useSWR(
    `/api/dsapi`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<CommissionData[]>(await res.text());
    }
  );

  return {
    dataDS: data,
    isError: error,
    isLoading: !error && !data,
  };
}

function RefreshLinks(dossierExternalId: string) {
  const { data, error } = useSWR(
    `/api/dslinks?externalid=${dossierExternalId}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return superJSONParse<PieceDossierEnfant[]>(await res.text());
    }
  );

  return {
    isError: error,
    isLoading: !error && !data,
  };
}

type DatePeriod = "past" | "upcoming";
function useCommissions(
  datePeriod: DatePeriod | undefined = "upcoming",
  departement: string | undefined = "all",
  withChild = true
) {
  const { data, error } = useSWR(
    `/api/commissions?datePeriod=${datePeriod}&departement=${departement}&withChild=${withChild}`,
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
  RefreshLinks,
  useAllUsers,
  useCommentaires,
  useCommission,
  useCommissions,
  useDataDS,
  useDossier,
};
