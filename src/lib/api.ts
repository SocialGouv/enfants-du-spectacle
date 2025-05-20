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

function useRefreshLinks(dossierExternalId: string, source: Source) {
  
  // Validate input parameters to avoid API errors
  const isValidId = dossierExternalId && dossierExternalId.trim() !== '';
  const shouldFetch = source === 'FORM_EDS' && isValidId;
  
  const { data, error } = useSWR(
    shouldFetch ? `/api/edslinks?externalid=${dossierExternalId}` : null,
    async function (input: RequestInfo, init?: RequestInit) {
      try {
        console.log('Fetching links from:', input);
        const res = await fetch(input, init);
        
        if (!res.ok) {
          console.error(`Error fetching links: ${res.status}`);
          // Return empty data structure instead of throwing
          return { 
            id: 0, 
            dossier: { id: 0, piecesDossier: [] },
            enfants: []
          };
        }
        
        return res.json();
      } catch (error) {
        console.error('Error in links fetch:', error);
        // Return empty data structure instead of throwing
        return { 
          id: 0, 
          dossier: { id: 0, piecesDossier: [] },
          enfants: []
        };
      }
    },
    {
      // Add fallback data to avoid nullish errors
      fallbackData: { 
        id: 0, 
        dossier: { id: 0, piecesDossier: [] },
        enfants: []
      },
      // Increase staletime to reduce refetches on problematic endpoints
      dedupingInterval: 10000
    }
  );

  return {
    dataLinks: data || { 
      id: 0, 
      dossier: { id: 0, piecesDossier: [] },
      enfants: []
    },
    isError: error && shouldFetch,
    isLoading: shouldFetch && !error && !data,
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
  useRefreshLinks,
  searchUsers,
  useAllUsers,
  useCommentaires,
  useCommission,
  useCommissions,
  useDataDS,
  useDatesCommissions,
  useDossier,
};
