import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CommissionBloc from "src/components/Commission";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import type { CommissionData, SearchResultsType } from "src/lib/queries";
import { getCommissions, searchEnfants, searchProjets } from "src/lib/queries";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

import { PrismaClient } from ".prisma/client";

interface Props {
  commissions: CommissionData[];
  searchResults?: SearchResultsType;
  searchValue?: string;
}

const Page: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState(props.searchValue ?? "");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const commissions = props.commissions;
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    props.searchResults ?? null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults(null);
      setLoading(false);
      const p = async () =>
        router.push(`/dossiers`, undefined, { shallow: true });
      p().catch((e) => {
        throw e;
      });
      return;
    }
    window
      .fetch(
        `/api/search.json?${new URLSearchParams({
          search: debouncedSearch,
        })}`
      )
      .then(async (res) => res.text())
      .then(async (rawJSON: string) => {
        setSearchResults(superJSONParse<SearchResultsType>(rawJSON));
        setLoading(false);
        await router.push(
          `/dossiers?search=${encodeURIComponent(debouncedSearch)}`,
          undefined,
          { shallow: true }
        );
      })
      .catch((e) => {
        throw e;
      });
  }, [debouncedSearch]);

  if (!session) {
    return <Layout>Veuillez vous connecter</Layout>;
  }

  return (
    <Layout
      headerMiddle={<SearchBar value={searchValue} onChange={onSearchChange} />}
    >
      {loading && <div>chargement...</div>}
      {!loading &&
        !debouncedSearch &&
        commissions.map((commission: CommissionData) => (
          <CommissionBloc
            key={commission.date.toString()}
            commission={commission}
          />
        ))}
      {!loading && debouncedSearch && searchResults && (
        <SearchResults searchResults={searchResults} />
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
    if (query.search) {
      const searchResults = {
        enfants: await searchEnfants(prisma, query.search as string),
        projets: await searchProjets(prisma, query.search as string),
      };
      return {
        props: {
          commissions,
          searchResults,
          searchValue: query.search,
          session,
        },
      };
    }
    return { props: { commissions, session } };
  }
  return { props: { session } };
};

export default Page;
