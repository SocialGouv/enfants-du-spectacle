import { Select, Table, Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { parse as superJSONParse } from "superjson";

import ChangeStatutProjetButton from "../../components/ChangeStatutProjetButton";
import Layout from "../../components/Layout";
import { frenchDateText, shortUserName } from "../../lib/helpers";
import styles from "./dossiers.module.scss";
import type {
  Commission,
  Enfant,
  Projet,
  SocieteProduction,
  User,
} from ".prisma/client";
import { PrismaClient } from ".prisma/client";

type ProjetData = Projet & {
  user: User | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
};
interface Props {
  projet: ProjetData;
  users: User[];
}

function updateProjet(
  projet: Projet,
  updates: Record<string, unknown>,
  callback: (updatedProjet: ProjetData) => void
) {
  window
    .fetch(`/api/dossiers/${projet.id}`, {
      body: JSON.stringify(updates),
      method: "PUT",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .then(async (r) => r.text())
    .then((rawJson) => {
      const updatedProjet = superJSONParse<ProjetData>(rawJson);
      callback(updatedProjet);
    })
    .catch((e) => {
      throw e;
    });
}

const Page: React.FC<Props> = (props) => {
  const { users } = props;
  const [projet, setProjet] = useState(props.projet);
  const [assignedUserId] = useState(projet.userId);

  const onChangeStatut = (transitionEvent: string) => {
    updateProjet(projet, { transitionEvent }, setProjet);
  };

  const onAssignUserId: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    const userId = event.target.value;
    updateProjet(projet, { userId: userId }, setProjet);
  };

  const title = (
    <>
      <Title as="h1">{projet.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title}>
      <div className={styles.title}>
        <Title as="h1">Le Projet</Title>
        <ChangeStatutProjetButton projet={projet} onChange={onChangeStatut} />
      </div>

      <div className={styles.summaryBloc}>
        <div>
          <div>
            <b>Suivi par</b>
          </div>
          <div>{projet.user && shortUserName(projet.user)}</div>

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
        Assigner à
        <Select
          selected={assignedUserId}
          options={[{}].concat(
            users.map((u) => ({ label: u.email, value: u.id }))
          )}
          onChange={onAssignUserId}
        />
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
        commission: true,
        enfants: true,
        societeProduction: true,
        user: true,
      },
      where: { id },
    });
    const users = await prisma.user.findMany();
    return { props: { projet, users } };
  }
  return { props: { session } };
};

export default Page;
