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
import type { CommissionData, SearchResultsType } from "src/lib/queries";
import { getCommissions, searchEnfants, searchProjets } from "src/lib/queries";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

import type { User } from ".prisma/client";
import { PrismaClient } from ".prisma/client";

interface Props {
  commissions: CommissionData[];
  searchResults?: SearchResultsType;
  searchValue?: string;
  allUsers: User[];
}
interface Filters {
  userId?: number;
}

const Page: React.FC<Props> = ({
  searchValue: initialSearchValue,
  commissions: initialCommissions,
  searchResults: initialSearchResults,
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
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
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

  useEffect(() => {
    if (!filters.userId) {
      setFilteredCommissions(commissions);
      setFilteredSearchResults(searchResults);
      return;
    }
    setFilteredCommissions(
      commissions.map((commission) => ({
        ...commission,
        projets: commission.projets.filter((p) => p.userId == filters.userId),
      }))
    );
    if (searchResults) {
      setFilteredSearchResults({
        enfants: searchResults.enfants.filter(
          (e) => e.projet.userId == filters.userId
        ),
        projets: searchResults.projets.filter(
          (p) => p.userId == filters.userId
        ),
      });
    }
  }, [filters, searchResults, initialCommissions]);

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

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (loading) return;
    if (debouncedSearch) searchParams.append("search", debouncedSearch);
    if (filters.userId) searchParams.append("userId", String(filters.userId));

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
          filteredUserId={filters.userId}
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
    if (query.search) {
      const searchResults = {
        enfants: await searchEnfants(prisma, query.search as string),
        projets: await searchProjets(prisma, query.search as string),
      };
      return {
        props: {
          allUsers,
          commissions,
          searchResults,
          searchValue: query.search,
          session,
        },
      };
    }
    return { props: { allUsers, commissions, session } };
  }
  return { props: { session } };
};

export default Page;
