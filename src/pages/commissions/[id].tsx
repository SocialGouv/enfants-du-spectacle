import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import CommissionBloc from "src/components/Commission";
import Layout from "src/components/Layout";
import { useCommission } from "src/lib/api";
import useProtectedPage from "src/lib/useProtectedPage";

const Page: React.FC = () => {
  const router = useRouter();
  const { loading: loadingSession } = useProtectedPage();
  const commissionId = Number(router.query.id as string);
  const { commission, isLoading, isError } = useCommission(commissionId);

  if (isLoading || loadingSession) return <Icon name="ri-loader-line" />;
  if (isError || !commission) return <Icon name="ri-error" />;

  return (
    <Layout
      windowTitle="Commission"
      headerMiddle={<Title as="h1">Commission </Title>}
    >
      <CommissionBloc commission={commission} />
    </Layout>
  );
};

export default Page;
