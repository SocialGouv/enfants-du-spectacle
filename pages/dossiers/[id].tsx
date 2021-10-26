import { Tag, Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Layout from "../../components/Layout";
import { frenchDateText, shortAgentName } from "../../lib/helpers";
import styles from "./dossiers.module.scss";
import type {
  Agent,
  Commission,
  Projet,
  SocieteProduction,
} from ".prisma/client";
import { PrismaClient } from ".prisma/client";

type ProjetData = Projet & {
  agent: Agent | null;
  commission: Commission;
  societeProduction: SocieteProduction;
};
interface Props {
  projet: ProjetData;
}

const Page: React.FC<Props> = ({ projet }) => {
  const title = (
    <>
      <Title as="h1">{projet.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title}>
      <div className={styles.title}>
        <Title as="h1">Le Projet</Title>
        <Tag className={styles.tagProjet}>En&nbsp;cours</Tag>
      </div>
      <div className={styles.summary}>
        <div>
          <div>
            <b>Suivi par</b>
          </div>
          <div>{projet.agent && shortAgentName(projet.agent)}</div>

          <div>
            <b>Date de commission</b>
          </div>
          <div>{frenchDateText(projet.commission.date)}</div>
        </div>
        <div>
          <div>
            <b>Type de projet</b>
          </div>
          <div>
            Cinéma
            <br />
            Long-Métrage
          </div>
        </div>
        <div>
          <b>Société</b>
          <div>{projet.societeProduction.nom}</div>
          <div>{projet.societeProduction.departement}</div>
          <div>{projet.societeProduction.siret}</div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    if (!context.params || !context.params.id) {
      throw Error("nono");
    }
    const id = parseInt(context.params.id as string, 10);
    const prisma = new PrismaClient();
    const projet = await prisma.projet.findUnique({
      include: { agent: true, commission: true, societeProduction: true },
      where: { id },
    });
    return { props: { projet } };
  }
  return { props: { session } };
};

export default Page;
