import type { User } from "@prisma/client";
import _ from "lodash";
import Link from "next/link";
import React from "react";
import { MultiSelect } from "react-multi-select-component";
import AddUserModal from "src/components/AddUserModal";
import { ALL_DEPARTEMENTS, frenchDepartementName } from "src/lib/helpers";
import { trpc } from "src/lib/trpc";
import styles from "src/styles/commissions.module.scss";

interface Props {
  allUsers: User[];
  onUserUpdate?: () => void;
  onPageChange?: (page: number) => void;
  page: number;
  total: number;
  totalPages: number;
}

interface RowProps {
  user: User;
  deleteUser: (id: number) => void;
  updateUserMutation: any;
}

const UserRow: React.FC<RowProps> = ({
  user,
  deleteUser,
  updateUserMutation,
}) => {
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
      updateUserMutation.mutate({
        id: newUser.id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
        departement: newUser.departement,
        departements: newUser.departements,
        telephone: newUser.telephone,
        fonction: newUser.fonction,
      });
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
            onChange={(
              value: { key: string; label: string; value: string }[]
            ) => {
              setSelected(value);
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

const Utilisateurs: React.FC<Props> = ({
  allUsers,
  onUserUpdate,
  onPageChange,
  page,
  total,
  totalPages,
}) => {
  const [userList, setUserList] = React.useState<User[]>(allUsers);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  // Synchroniser userList avec allUsers
  React.useEffect(() => {
    setUserList(allUsers);
  }, [allUsers]);

  // Mutations tRPC
  const createUserMutation = trpc.users.createUser.useMutation({
    onSuccess: async () => {
      // Rediriger vers la première page pour voir le nouvel utilisateur
      onPageChange?.(1);
      // Petit délai pour laisser le temps à la DB de se mettre à jour
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Refetch la liste après création
      await onUserUpdate?.();
    },
  });

  const deleteUserMutation = trpc.users.deleteUser.useMutation({
    onSuccess: async () => {
      // Refetch la liste après suppression
      await onUserUpdate?.();
    },
  });

  const updateUserMutation = trpc.users.updateUser.useMutation();

  const deleteUser = (id: number) => {
    // Optimistic update
    const userListTmp: User[] = userList.filter((user: User) => user.id !== id);
    setUserList(userListTmp);

    // API call
    deleteUserMutation.mutate({ id });
  };

  const addUser = (formData: Partial<User>) => {
    const userData = {
      nom: formData.nom || null,
      prenom: formData.prenom || null,
      email: formData.email || null,
      role: formData.role || null,
      departement: formData.departement || null,
      departements: formData.departements || [],
      telephone: formData.telephone || null,
      fonction: formData.fonction || null,
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => {
        setSuccessMessage("Utilisateur ajouté avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000);
      },
      onError: () => {
        setSuccessMessage("Erreur lors de l'ajout de l'utilisateur");
        setTimeout(() => setSuccessMessage(""), 3000);
      },
    });
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <button className="postButton" onClick={() => setIsModalOpen(true)}>
          Ajouter un utilisateur
        </button>
      </div>

      {successMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: successMessage.includes("succès")
              ? "#d4edda"
              : "#f8d7da",
            color: successMessage.includes("succès") ? "#155724" : "#721c24",
            border: `1px solid ${
              successMessage.includes("succès") ? "#c3e6cb" : "#f5c6cb"
            }`,
            borderRadius: "4px",
          }}
        >
          {successMessage}
        </div>
      )}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addUser}
      />

      <p>
        Page {page} sur {totalPages} - {total} utilisateur(s) au total
      </p>
      {userList.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          deleteUser={deleteUser}
          updateUserMutation={updateUserMutation}
        />
      ))}
    </>
  );
};

export default Utilisateurs;
