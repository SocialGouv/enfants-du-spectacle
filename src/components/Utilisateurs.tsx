import type { User } from "@prisma/client";
import _ from "lodash";
import Link from "next/link";
import React from "react";
import { MultiSelect } from "react-multi-select-component";
import AddUser from "src/components/AddUtilisateur";
import { ALL_DEPARTEMENTS, frenchDepartementName } from "src/lib/helpers";
import { createUser, removeUser, updateUser } from "src/lib/queries";
import styles from "src/styles/commissions.module.scss";

interface Props {
  allUsers: User[];
}

interface RowProps {
  user: User;
  deleteUser: (id: number) => void;
}

const UserRow: React.FC<RowProps> = ({ user, deleteUser }) => {
  const [changeDep, setDepartementChange] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState(
    user.departements.map((departement) => {
      return {
        key: departement,
        label: frenchDepartementName(departement),
        value: departement,
      };
    })
  );
  const [newUser, changeUser] = React.useState<User>(user);
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);

  React.useEffect(() => {
    changeUser({
      ...user,
      departements: _.map(selected, "key"),
    });
  }, [selected]);

  React.useEffect(() => {
    setMountedRef(true);
  });

  React.useEffect(() => {
    if (mountedRef && newUser.id) {
      updateUser(newUser);
    }
  }, [newUser]);

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
        {changeDep ? (
          <MultiSelect
            options={ALL_DEPARTEMENTS.map((u) => ({
              key: u,
              label: frenchDepartementName(u),
              value: u,
            }))}
            value={selected}
            hasSelectAll={false}
            onChange={(value) => {
              setSelected(
                value as React.SetStateAction<
                  { key: string; label: string; value: string }[]
                >
              );
              setDepartementChange(!changeDep);
            }}
            labelledBy="Département(s)"
          />
        ) : (
          <span>
            {newUser.departements.map((departement) => (
              <b key={departement}>
                <li key={departement}>{frenchDepartementName(departement)}</li>
              </b>
            ))}
            <br />
            {user.role === "MEMBRE" && (
              <button
                onClick={() => {
                  setDepartementChange(!changeDep);
                }}
              >
                Modifier
              </button>
            )}
          </span>
        )}
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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      departements: formData.departements || [""],
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
