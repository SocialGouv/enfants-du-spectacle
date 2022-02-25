import { Icon, Title } from "@dataesr/react-dsfr";
import React from "react";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import Utilisateurs from "src/components/Utilisateurs";
import { useAllUsers } from "src/lib/api";

const Page: React.FC = () => {
  const { allUsers, ...swrUsers } = useAllUsers();
  const isLoading = swrUsers.isLoading;
  const isError = !isLoading && (swrUsers.isError || !allUsers);

  return (
    <Layout
      windowTitle="Utilisateurs"
      headerMiddle={<Title as="h1">Utilisateurs</Title>}
      breadcrumbs={[
        { href: "/", label: "Accueil" },
        { label: "Liste utilisateurs" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && allUsers && (
        <>
          <Utilisateurs allUsers={allUsers} />
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
