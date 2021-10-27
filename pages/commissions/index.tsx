import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import CommissionBloc from "../../components/Commission";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import type { CommissionData } from "../../lib/queries";
import { getCommissions } from "../../lib/queries";
import { PrismaClient } from ".prisma/client";

interface Props {
  commissions: CommissionData[];
}

type CommissionJSON = CommissionData & {
  date: string;
  dateLimiteDepot: string;
};

const Page: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [commissions, setCommissions] = useState<CommissionData[]>(
    props.commissions
  );
  const [loading, setLoading] = useState(false);

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    window
      .fetch(
        `/api/commissions.json?${new URLSearchParams({
          search: debouncedSearch,
        })}`
      )
      .then(async (res) => res.json())
      .then((data: CommissionJSON[]) => {
        const commissionsData: CommissionData[] = data.map(
          (commissionJson) => ({
            ...commissionJson,
            date: new Date(commissionJson.date),
            dateLimiteDepot: new Date(commissionJson.dateLimiteDepot),
          })
        );
        setCommissions(commissionsData);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
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
        commissions.map((commission: CommissionData) => (
          <CommissionBloc
            key={commission.date.toString()}
            commission={commission}
          />
        ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const prisma = new PrismaClient();
    const commissions = await getCommissions(prisma);
    return { props: { commissions, session } };
  }
  return { props: { session } };
};

export default Page;
