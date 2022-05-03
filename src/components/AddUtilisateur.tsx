import { Select } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import * as React from "react";
import styles from "src/components/AddUtilisateur.module.scss";
import {
  ALL_DEPARTEMENTS,
  frenchDepartementName,
  ROLES_USERS,
} from "src/lib/helpers";

interface Props {
  saveUser: (e: React.FormEvent, formData: User) => void;
}

interface Option {
  label: string | null;
  value: string;
}

const AddUser: React.FC<Props> = ({ saveUser }) => {
  const [formData, setFormData] = React.useState<User>({
    departement: "",
    email: "",
    emailVerified: new Date(),
    id: 1,
    image: "",
    name: "",
    nom: "",
    prenom: "",
    role: "",
  });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const defaultDepartement: Option = {
    label: "Département",
    value: "",
  };

  return (
    <div>
      <form
        className={styles.Form}
        onSubmit={(e) => {
          e.currentTarget.value = "";
          saveUser(e, formData);
        }}
      >
        <div className={styles.formField}>
          <div className={styles.blocForm}>
            <label htmlFor="nom" className="mb-2 italic">
              Nom
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="nom"
              name="nom"
              className="inputText"
            />
          </div>
          <div className={styles.blocForm}>
            <label htmlFor="prenom" className="mb-2 italic">
              Prénom
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="prenom"
              name="prenom"
              className="inputText"
            />
          </div>
          <div className={styles.blocForm}>
            <label htmlFor="email" className="mb-2 italic">
              Email
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="email"
              name="email"
              className="inputText"
            />
          </div>
          <div className={styles.blocForm}>
            <label htmlFor="role" className="mb-2 italic">
              Rôle
            </label>
            <div className="selectDpt">
              <Select
                id="role"
                name="role"
                selected={formData.role ? formData.role : ""}
                options={[
                  { label: formData.role ? "" : "Choisir", value: "" },
                ].concat(
                  ROLES_USERS.map((u) => ({
                    label: u.label,
                    value: String(u.value),
                  }))
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleForm(event);
                }}
              />
            </div>
          </div>
          <div className={styles.blocForm}>
            <label htmlFor="departement" className="mb-2 italic">
              Département
            </label>
            <div className="selectDpt">
              <Select
                id="departement"
                name="departement"
                selected={formData.departement ? formData.departement : ""}
                options={[defaultDepartement].concat(
                  ALL_DEPARTEMENTS.map((u) => ({
                    key: u,
                    label: frenchDepartementName(u),
                    value: u,
                  }))
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleForm(event);
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="postButton"
          disabled={formData.email === "" ? true : false}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddUser;
