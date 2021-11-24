import { Icon } from "@dataesr/react-dsfr";
import type { SocieteProduction } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommissionBloc from "src/components/Commission";
import FilterBar from "src/components/FilterBar";
import FilterBarText from "src/components/FilterBarText";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import { useCommissions } from "src/lib/api";
import {
  filterCommissions,
  filterSearchResults,
  getFilterableSocietesProductions,
} from "src/lib/helpers";
import getPrismaClient from "src/lib/prismaClient";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";
import { searchDossiers, searchEnfants } from "src/lib/queries";
import useProtectedPage from "src/lib/useProtectedPage";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

interface Props {
  searchResults?: SearchResultsType;
  searchValue?: string;
}

const Page: React.FC<Props> = ({
  searchValue: initialSearchValue,
  searchResults: initialSearchResults,
}) => {
  const { query } = useRouter();
  const initialFilters: DossiersFilters = {
    grandeCategorie: query.grandeCategorie,
    societeProductionId: query.societeProductionId,
    userId: query.userId,
  };

  const { loading: loadingSession, session } = useProtectedPage();
  const { commissions, ...swrCommissions } = useCommissions();
  const [searchValue, setSearchValue] = useState(initialSearchValue ?? "");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    initialSearchResults ?? null
  );
  const [filteredSearchResults, setFilteredSearchResults] =
    useState<SearchResultsType | null>();
  const [filteredCommissions, setFilteredCommissions] =
    useState<CommissionData[]>();
  const [filterableSocieteProductions, setFilterableSocietesProductions] =
    useState<SocieteProduction[]>(
      getFilterableSocietesProductions(searchResults, commissions ?? [])
    );
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DossiersFilters>(initialFilters);
  const router = useRouter();

  // Apply filters to displayed dossiers (client-side)
  useEffect(() => {
    setFilteredCommissions(filterCommissions(commissions ?? [], filters));
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
      commissions ?? []
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

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValue(event.target.value);
  };

  function onChangeFilters(updates: Record<string, number | string>): void {
    setFilters({ ...filters, ...updates });
  }

  if (loadingSession || swrCommissions.isLoading)
    return <Icon name="ri-loader-line" />;
  if (swrCommissions.isError || !session || !commissions)
    return <Icon name="ri-error" />;

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
  const prisma = getPrismaClient();
  const { query } = context;
  if (query.search) {
    const searchResults = {
      dossiers: await searchDossiers(prisma, query.search as string),
      enfants: await searchEnfants(prisma, query.search as string),
    };
    return {
      props: {
        searchResults,
        searchValue: query.search,
      },
    };
  }
  return { props: {} };
};

export default Page;
