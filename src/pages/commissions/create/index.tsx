import { Title } from "@dataesr/react-dsfr";
import React from "react";
import Layout from "src/components/Layout";

const Page: React.FC = () => {
  return (
    <Layout
      windowTitle="Commission"
      headerMiddle={<Title as="h1">Créer commission </Title>}
    />
  );
};

Page.auth = true;

export default Page;
