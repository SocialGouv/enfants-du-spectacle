import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CommissionBloc from "src/components/Commission";
import FilterBar from "src/components/FilterBar";
import FilterBarText from "src/components/FilterBarText";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import {
  filterCommissions,
  filterSearchResults,
  getFilterableSocietesProductions,
} from "src/lib/helpers";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";
import { getCommissions, searchEnfants, searchProjets } from "src/lib/queries";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

import type { SocieteProduction, User } from ".prisma/client";
import { PrismaClient } from ".prisma/client";

interface Props {
  commissions: CommissionData[];
  searchResults?: SearchResultsType;
  searchValue?: string;
  allUsers: User[];
  filters?: DossiersFilters;
}

const Page: React.FC<Props> = ({
  searchValue: initialSearchValue,
  commissions: initialCommissions,
  searchResults: initialSearchResults,
  filters: initialFilters,
  allUsers,
}) => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState(initialSearchValue ?? "");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    initialSearchResults ?? null
  );
  const [filteredSearchResults, setFilteredSearchResults] =
    useState<SearchResultsType | null>();
  const [commissions] = useState(initialCommissions);
  const [filteredCommissions, setFilteredCommissions] =
    useState<CommissionData[]>();
  const [filterableSocieteProductions, setFilterableSocietesProductions] =
    useState<SocieteProduction[]>(
      getFilterableSocietesProductions(searchResults, commissions)
    );
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DossiersFilters>(initialFilters ?? {});
  const router = useRouter();

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValue(event.target.value);
  };

  function onChangeFilter(name: string, value: number | string): void {
    setFilters({ ...filters, [name]: value });
  }

  // Apply filters to displayed dossiers (client-side)
  useEffect(() => {
    setFilteredCommissions(filterCommissions(commissions, filters));
    if (!searchResults) return;
    setFilteredSearchResults(filterSearchResults(searchResults, filters));
  }, [filters, searchResults, commissions]);

  // Trigger search for word (server-side)
  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults(null);
      setLoading(false);
      return;
    }
    window
      .fetch(
        `/api/search.json?${new URLSearchParams({
          search: debouncedSearch,
        })}`
      )
      .then(async (res) => res.text())
      .then((rawJSON: string) => {
        setSearchResults(superJSONParse<SearchResultsType>(rawJSON));
        setLoading(false);
      })
      .catch((e) => {
        throw e;
      });
  }, [debouncedSearch]);

  // Refresh filterable societe productions
  useEffect(() => {
    const societes = getFilterableSocietesProductions(
      searchResults,
      commissions
    );
    setFilterableSocietesProductions(societes);
    if (
      filters.societeProductionId &&
      !societes.find((s) => s.id == filters.societeProductionId)
    ) {
      setFilters({ ...filters, societeProductionId: undefined });
    }
  }, [searchResults, commissions, filters]);

  // synchronize URL querystring
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (loading) return;
    if (debouncedSearch) searchParams.append("search", debouncedSearch);
    if (filters.userId) searchParams.append("userId", String(filters.userId));
    if (filters.societeProductionId)
      searchParams.append(
        "societeProductionId",
        String(filters.societeProductionId)
      );

    const p = async () =>
      router.push(
        `/dossiers${searchParams.toString() !== "" ? "?" : ""}${searchParams}`,
        undefined,
        { shallow: true }
      );
    p().catch((e) => {
      throw e;
    });
  }, [debouncedSearch, filters, loading]);

  if (!session) {
    return <Layout>Veuillez vous connecter</Layout>;
  }

  return (
    <Layout
      headerMiddle={<SearchBar value={searchValue} onChange={onSearchChange} />}
      headerBottom={
        <FilterBar
          text={
            <FilterBarText
              searchResults={!loading && debouncedSearch ? searchResults : null}
              commissions={commissions}
            />
          }
          allUsers={allUsers}
          onChangeFilter={onChangeFilter}
          allSocieteProductions={filterableSocieteProductions}
          filters={filters}
        />
      }
    >
      {loading && <div>chargement...</div>}
      {!loading &&
        !debouncedSearch &&
        filteredCommissions?.map((commission: CommissionData) => (
          <CommissionBloc
            key={commission.date.toString()}
            commission={commission}
          />
        ))}
      {!loading && debouncedSearch && filteredSearchResults && (
        <SearchResults searchResults={filteredSearchResults} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const session = await getSession(context);
  if (session) {
    const prisma = new PrismaClient();
    const commissions = await getCommissions(prisma);
    const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });
    const filters = {
      societeProductionId: query.societeProductionId,
      userId: query.userId,
    };
    if (query.search) {
      const searchResults = {
        enfants: await searchEnfants(prisma, query.search as string),
        projets: await searchProjets(prisma, query.search as string),
      };
      return {
        props: {
          allUsers,
          commissions,
          filters,
          searchResults,
          searchValue: query.search,
          session,
        },
      };
    }
    return { props: { allUsers, commissions, filters, session } };
  }
  return { props: { session } };
};

export default Page;
