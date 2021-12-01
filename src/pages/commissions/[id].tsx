import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import CommissionBloc from "src/components/Commission";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useCommission } from "src/lib/api";

const Page: React.FC = () => {
  const router = useRouter();
  const { commission, ...swrCommission } = useCommission(
    typeof router.query.id == "string" ? Number(router.query.id) : null
  );
  const isLoading = swrCommission.isLoading;
  const isError = !isLoading && (swrCommission.isError || !commission);

  return (
    <Layout
      windowTitle="Commission"
      headerMiddle={<Title as="h1">Commission </Title>}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && commission && (
        <CommissionBloc commission={commission} />
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
