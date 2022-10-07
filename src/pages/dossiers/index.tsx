import { Icon } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
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
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

const Page: React.FC = () => {
  const session = useSession();
  if (
    session.data.dbUser.role !== "ADMIN" ||
    session.data.dbUser.role !== "INSTRUCTEUR"
  ) {
    signOut({
      callbackUrl: "https://enfants-du-spectacle.fabrique.social.gouv.fr/",
    }).catch((e) => {
      console.log(e);
    });
  }
  const router = useRouter();
  const { isReady: routerIsReady, query } = router;
  const { commissions, ...swrCommissions } = useCommissions();
  const [searchValueInput, setSearchValueInput] = useState<string | undefined>(
    undefined
  );
  const [searchValueDebounced] = useDebounce(searchValueInput, 500);
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    null
  );
  // this madness gets the initial search value from querystring
  const searchValueEffective =
    routerIsReady && query.search && searchValueInput === undefined
      ? (query.search as string) || ""
      : searchValueDebounced;
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DossiersFilters | undefined>(
    undefined
  );

  const filteredCommissions =
    !swrCommissions.isLoading && filters !== undefined && commissions
      ? filterCommissions(commissions, filters)
      : undefined;

  const filteredSearchResults =
    !swrCommissions.isLoading &&
    filters !== undefined &&
    commissions &&
    searchResults
      ? filterSearchResults(searchResults, filters)
      : undefined;

  const filterableSocietesProductions =
    !swrCommissions.isLoading && !swrCommissions.isError && commissions
      ? getFilterableSocietesProductions(searchResults, commissions)
      : undefined;

  // keep filters in sync with querystring
  useEffect(() => {
    if (!routerIsReady) return;
    const newFilters = compact({
      departement: query.departement as string,
      grandeCategorie: query.grandeCategorie as string,
      societeProductionId: stringToNumberOrNull(
        query.societeProductionId as string
      ),
      userId: stringToNumberOrNull(query.userId as string),
    });
    setFilters(newFilters);
  }, [routerIsReady, query]);

  // Trigger search for word (server-side)
  useEffect(() => {
    if (!routerIsReady || searchValueEffective === undefined) return;
    setLoading(true);
    updateQuerystring({ search: searchValueEffective });
    if (!searchValueEffective) {
      setSearchResults(null);
      setLoading(false);
      return;
    }
    window
      .fetch(
        `/api/search.json?${new URLSearchParams({
          search: searchValueEffective,
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
  }, [searchValueEffective, routerIsReady]);

  // Remove filter on societeProduction if selected societe disappeared
  useEffect(() => {
    if (filters === undefined || filterableSocietesProductions === undefined)
      return;
    if (
      filters.societeProductionId &&
      !filterableSocietesProductions.find(
        (s) => s.id == filters.societeProductionId
      )
    ) {
      updateQuerystring({ societeProductionId: undefined });
    }
  }, [filters, filterableSocietesProductions]);

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValueInput(event.target.value);
  };

  function updateQuerystring(
    updates: Record<string, number | string | null | undefined>
  ) {
    router
      .replace(
        {
          query: compact({ ...query, ...updates }),
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => {
        throw e;
      });
  }

  const isLoading = swrCommissions.isLoading || loading;
  const isError = !isLoading && (swrCommissions.isError || !commissions);

  return (
    <Layout
      headerMiddle={
        <SearchBar
          value={
            // this other madness lets us keep the searchValueInput undefined
            // to distinguish initial load from querystring
            (searchValueInput == undefined && routerIsReady
              ? (query.search as string)
              : searchValueInput) ?? ""
          }
          onChange={onSearchChange}
        />
      }
      headerBottom={
        <FilterBar
          text={
            <FilterBarText
              searchResults={
                !loading && searchValueDebounced ? searchResults : null
              }
              commissions={commissions ?? []}
            />
          }
          onChangeFilters={updateQuerystring}
          allSocieteProductions={filterableSocietesProductions ?? []}
          filters={filters ?? {}}
        />
      }
      windowTitle="Dossiers"
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && !searchValueEffective && (
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
      {!isLoading &&
        !isError &&
        searchValueEffective &&
        filteredSearchResults && (
          <SearchResults searchResults={filteredSearchResults} />
        )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
