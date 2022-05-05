import type { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AddUser from "src/components/AddUtilisateur";
import { frenchDepartementName } from "src/lib/helpers";
import { createUser, removeUser } from "src/lib/queries";
import styles from "src/styles/commissions.module.scss";

interface Props {
  allUsers: User[];
}

interface RowProps {
  user: User;
  deleteUser: (id: number) => void;
}

const UserRow: React.FC<RowProps> = ({ user, deleteUser }) => {
  return (
    <div className={`${styles.rowUser} card`}>
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
        <b>{user.role}</b>
      </div>
      <div>
        <b>{user.departement ? frenchDepartementName(user.departement) : ""}</b>
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

const Utilisateurs: React.FC<Props> = ({ allUsers }) => {
  const [userList, setUserList] = React.useState<User[]>(allUsers);

  const deleteUser = (id: number) => {
    const userListTmp: User[] = userList.filter((user: User) => user.id !== id);
    setUserList(userListTmp);
    removeUser(id);
  };

  const addUser = (e: React.FormEvent, formData: User) => {
    e.preventDefault();
    const user: User = {
      departement: formData.departement,
      email: formData.email,
      emailVerified: new Date(),
      nom: formData.nom,
      prenom: formData.prenom,
      role: formData.role,
    };
    createUser(user);
    setUserList([user, ...userList]);
  };

  return (
    <>
      <AddUser saveUser={addUser} />
      {userList.map((user) => (
        <UserRow key={user.id} user={user} deleteUser={deleteUser} />
      ))}
    </>
  );
};

export default Utilisateurs;
