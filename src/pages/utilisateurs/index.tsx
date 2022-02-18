import { Icon, Title } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AddUser from "src/components/AddUtilisateur";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useAllUsers } from "src/lib/api";
import { createUser, removeUser } from "src/lib/queries";
import styles from "src/styles/commissions.module.scss";

interface RowProps {
  user: User;
  deleteUser: (id: number) => void;
}

const UserRow: React.FC<RowProps> = ({ user, deleteUser }) => {
  return (
    <div className={`${styles.row} card`}>
      <div>
        <span role="img" aria-label="hammer">
          🔨
        </span>{" "}
        <b>{user.email}</b>
      </div>
      <div>
        <b>
          {user.nom} {user.prenom}
        </b>
      </div>
      <div>
        <b />
      </div>
      <div>
        <Link href={`/utilisateurs`}>
          <a
            href={`/utilisateurs`}
            className={styles.seeDossiers}
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Supprimer utilisateur
          </a>
        </Link>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const { allUsers, ...swrUsers } = useAllUsers();
  const isLoading = swrUsers.isLoading;
  const isError = !isLoading && (swrUsers.isError || !allUsers);

  const deleteUser = (id: number) => {
    removeUser(id);
  };

  const addUser = (e: React.FormEvent, formData: User) => {
    e.preventDefault();
    const user: User = {
      email: formData.email,
      emailVerified: new Date(),
      nom: formData.nom,
      prenom: formData.prenom,
    };
    createUser(user);
    console.log("user : ", user);
  };

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
          <AddUser saveUser={addUser} />
          {allUsers.map((user) => (
            <UserRow key={user.id} user={user} deleteUser={deleteUser} />
          ))}
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
