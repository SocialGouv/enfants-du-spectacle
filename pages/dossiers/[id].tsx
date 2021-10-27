import { Button, Table, Tag, Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Layout from "../../components/Layout";
import { frenchDateText, shortAgentName } from "../../lib/helpers";
import type { StatutProjetStr } from "../../lib/statutProjet";
import {
  factory as statutProjetFSMFactory,
  statutProjetEventToFrench,
  statutProjetToFrench,
} from "../../lib/statutProjet";
import styles from "./dossiers.module.scss";
import type {
  Agent,
  Commission,
  Enfant,
  Projet,
  SocieteProduction,
} from ".prisma/client";
import { PrismaClient } from ".prisma/client";

type ProjetData = Projet & {
  agent: Agent | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
};
interface Props {
  projet: ProjetData;
}

const Page: React.FC<Props> = ({ projet }) => {
  const statutProjetFSM = statutProjetFSMFactory(projet.statut as string);
  const title = (
    <>
      <Title as="h1">{projet.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title}>
      <div className={styles.title}>
        <Title as="h1">Le Projet</Title>
        <Tag className={styles.tagProjet}>
          {statutProjetToFrench(projet.statut as StatutProjetStr)}
        </Tag>
      </div>

      <div className={styles.bloc}>
        Changer de statut:{" "}
        {statutProjetFSM.transitions().map((transitionEvent) => (
          <Button key={transitionEvent}>
            {statutProjetEventToFrench(transitionEvent)}
          </Button>
        ))}
      </div>

      <div className={styles.summaryBloc}>
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

      <div className={styles.bloc}>
        <Title as="h3">Enfants</Title>
        {projet.enfants.length == 0 && <span>Aucun enfant</span>}
        {projet.enfants.length > 0 && (
          <Table
            columns={[
              { label: "Prénom", name: "prenom" },
              { label: "Nom", name: "nom" },
              { label: "Rôle", name: "role" },
            ]}
            data={projet.enfants}
            rowKey="id"
          />
        )}
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
      include: {
        agent: true,
        commission: true,
        enfants: true,
        societeProduction: true,
      },
      where: { id },
    });
    return { props: { projet } };
  }
  return { props: { session } };
};

export default Page;
