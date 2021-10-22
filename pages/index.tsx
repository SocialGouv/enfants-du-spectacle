import { Title } from "@dataesr/react-dsfr";
import type { NextPage } from "next";
import React from "react";

import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Title as="h1">Enfants du Spectacle - Interface agents</Title>
      <p>
        Ce service numérique est dédié aux agents de la DRIEETS d’Île-de-France
        en charge des dossiers de demande d’emploi d’enfants du spectacle.
      </p>
    </Layout>
  );
};

export default Home;
