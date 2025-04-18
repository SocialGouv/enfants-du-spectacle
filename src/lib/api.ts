import type { PieceDossierEnfant, Source, User } from "@prisma/client";
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
      return res.json();
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
      return res.json();
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
      return res.json();
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
      return res.json();
    }
  );

  return {
    dataDS: data,
    isError: error,
    isLoading: !error && !data,
  };
}

function RefreshLinks(dossierExternalId: string, source: Source) {

  console.log('refresh from dossier : ', dossierExternalId, source)
  
  const { data, error } = useSWR(
    `${source === 'FORM_EDS' ? `/api/edslinks?externalid=${dossierExternalId}` : `/api/dslinks?externalid=${dossierExternalId}`}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return res.json();
    }
  );

  console.log('data : ', data)

  return {
    dataLinks: data,
    isError: error,
    isLoading: !error && !data,
  };
}

type DatePeriod = "past" | "upcoming";
function useCommissions(
  datePeriod: DatePeriod | "upcoming",
  departements: string[] | "all",
  withChild = true
) {
  console.log("departements in swr : ", departements);
  const { data, error } = useSWR(
    `/api/commissions?datePeriod=${datePeriod}&departements=${departements}&withChild=${withChild}`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return res.json();
    }
  );

  return {
    commissions: data,
    isError: error,
    isLoading: !error && !data,
  };
}

function useDatesCommissions() {
  const { data, error } = useSWR(
    `/api/commissions/date`,
    async function (input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      return res.json();
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
      return res.json();
    }
  );

  return {
    commission: data,
    isError: error,
    isLoading: !error && !data,
  };
}

const searchUsers = async (departement: string | null) => {
  const fetching = await fetch(`/api/users/search?departement=${departement}`, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching.json as User[];
};

export {
  RefreshLinks,
  searchUsers,
  useAllUsers,
  useCommentaires,
  useCommission,
  useCommissions,
  useDataDS,
  useDatesCommissions,
  useDossier,
};
