import type { User } from "@prisma/client";
import * as React from "react";
import styles from "src/components/AddCommission.module.scss";

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
  });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.currentTarget.value,
    });
  };

  return (
    <form
      className={styles.Form}
      onSubmit={(e) => {
        e.currentTarget.value = "";
        saveUser(e, formData);
      }}
    >
      <div>
        <div className={styles.formField}>
          <div>
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
          <div>
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
          <div>
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
        </div>
      </div>
      <button
        className={styles.postButton}
        disabled={formData.email === "" ? true : false}
      >
        Poster
      </button>
    </form>
  );
};

export default AddUser;
