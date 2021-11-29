import { Icon } from "@dataesr/react-dsfr";
import type { SocieteProduction } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommissionBloc from "src/components/Commission";
import FilterBar from "src/components/FilterBar";
import FilterBarText from "src/components/FilterBarText";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import { useCommissions } from "src/lib/api";
import {
  compact,
  filterCommissions,
  filterSearchResults,
  getFilterableSocietesProductions,
  stringToNumberOrNull,
} from "src/lib/helpers";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";
import useProtectedPage from "src/lib/useProtectedPage";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

const Page: React.FC = () => {
  const { query } = useRouter();
  const { loading: loadingSession, session } = useProtectedPage();
  const { commissions, ...swrCommissions } = useCommissions();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    null
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
  const [filters, setFilters] = useState<DossiersFilters>({});
  const router = useRouter();

  // keep filters in sync with querystring
  useEffect(() => {
    const newFilters = compact({
      grandeCategorie: query.grandeCategorie as string,
      societeProductionId: stringToNumberOrNull(
        query.societeProductionId as string
      ),
      userId: stringToNumberOrNull(query.userId as string),
    });
    // avoid double refresh after filter change
    if (JSON.stringify(newFilters) != JSON.stringify(filters))
      setFilters(newFilters);
  }, [query, filters]);

  // Apply filters to displayed dossiers (client-side)
  useEffect(() => {
    setFilteredCommissions(filterCommissions(commissions ?? [], filters));
    if (!searchResults) return;
    setFilteredSearchResults(filterSearchResults(searchResults, filters));
  }, [filters, searchResults, commissions]);

  // Trigger search for word (server-side)
  useEffect(() => {
    updateQuerystring({ search: debouncedSearch });
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

  function updateQuerystring(
    updates: Record<string, number | string | null | undefined>
  ) {
    router
      .replace(
        {
          pathname: router.pathname,
          query: compact({ ...router.query, ...updates }),
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => {
        throw e;
      });
  }

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValue(event.target.value);
  };

  function onChangeFilters(
    updates: Record<string, number | string | null>
  ): void {
    setFilters({ ...filters, ...updates });
    updateQuerystring(updates);
  }

  const isLoading = loadingSession || swrCommissions.isLoading || loading;
  const isError =
    !isLoading && (swrCommissions.isError || !session || !commissions);

  return (
    <Layout
      headerMiddle={<SearchBar value={searchValue} onChange={onSearchChange} />}
      headerBottom={
        <FilterBar
          text={
            <FilterBarText
              searchResults={!loading && debouncedSearch ? searchResults : null}
              commissions={commissions ?? []}
            />
          }
          onChangeFilters={onChangeFilters}
          allSocieteProductions={filterableSocieteProductions}
          filters={filters}
        />
      }
      windowTitle="Dossiers"
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && !debouncedSearch && (
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
      {!isLoading && !isError && debouncedSearch && filteredSearchResults && (
        <SearchResults searchResults={filteredSearchResults} />
      )}
    </Layout>
  );
};

export default Page;
