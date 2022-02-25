import { Select } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import * as React from "react";
import styles from "src/components/AddUtilisateur.module.scss";
import { ROLES_USERS } from "src/lib/helpers";

interface Props {
  saveUser: (e: React.FormEvent, formData: User) => void;
}

const AddUser: React.FC<Props> = ({ saveUser }) => {
  const [formData, setFormData] = React.useState<User>({
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
    console.log(formData);
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
              className={styles.inputText}
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
              className={styles.inputText}
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
              className={styles.inputText}
            />
          </div>
          <div className={styles.blocForm}>
            <div className={styles.selectRole}>
              <label htmlFor="role" className="mb-2 italic">
                Rôle
              </label>
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
        </div>
        <button
          className={styles.postButton}
          disabled={formData.email === "" ? true : false}
        >
          Poster
        </button>
      </form>
    </div>
  );
};

export default AddUser;
