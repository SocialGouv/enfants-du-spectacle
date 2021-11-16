import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CommissionBloc from "src/components/Commission";
import FilterBar from "src/components/FilterBar";
import FilterBarText from "src/components/FilterBarText";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import authMiddleware from "src/lib/authMiddleware";
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
import { getCommissions, searchDossiers, searchEnfants } from "src/lib/queries";
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

  function onChangeFilters(updates: Record<string, number | string>): void {
    setFilters({ ...filters, ...updates });
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
    if (filters.grandeCategorie)
      searchParams.append("grandeCategorie", filters.grandeCategorie);
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

  if (!session) throw Error("no session on protected page");

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
          onChangeFilters={onChangeFilters}
          allSocieteProductions={filterableSocieteProductions}
          filters={filters}
        />
      }
      windowTitle="Dossiers"
    >
      {loading && <div>chargement...</div>}
      {!loading && !debouncedSearch && (
        <>
          {filteredCommissions?.map((commission: CommissionData) => (
            <CommissionBloc
              key={commission.date.toString()}
              commission={commission}
            />
          ))}
          <div style={{ fontSize: "1.5rem", padding: "2rem 0 3rem 0" }}>
            <Link href="/commissions">Commissions passées…</Link>
          </div>
        </>
      )}
      {!loading && debouncedSearch && filteredSearchResults && (
        <SearchResults searchResults={filteredSearchResults} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const session = await getSession(context);
  const redirectTo = authMiddleware(session);
  if (redirectTo) return redirectTo;
  const prisma = new PrismaClient();
  const commissions = await getCommissions(prisma);
  const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const filters = {
    grandeCategorie: query.grandeCategorie,
    societeProductionId: query.societeProductionId,
    userId: query.userId,
  };
  if (query.search) {
    const searchResults = {
      dossiers: await searchDossiers(prisma, query.search as string),
      enfants: await searchEnfants(prisma, query.search as string),
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
};

export default Page;
