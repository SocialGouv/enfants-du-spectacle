import type { Commission } from "@prisma/client";
import * as React from "react";
import styles from "src/components/AddCommission.module.scss";

interface Props {
  saveCommission: (e: React.FormEvent, formData: Commission) => void;
}

const AddCommission: React.FC<Props> = ({ saveCommission }) => {
  const [formData, setFormData] = React.useState<Commission>({
    date: new Date(),
    dateLimiteDepot: new Date(),
    departement: "",
    id: 1,
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
        saveCommission(e, formData);
      }}
    >
      <div>
        <div className={styles.formField}>
          <div>
            <label htmlFor="departement" className="mb-2 italic">
              Département
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="departement"
              name="departement"
              className={styles.inputText}
            />
          </div>
          <div>
            <label htmlFor="date" className="mb-2 italic">
              Date
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="date"
              name="date"
              className={styles.inputText}
            />
          </div>
          <div>
            <label htmlFor="dateLimiteDepot" className="mb-2 italic">
              Date limite dépôt
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="dateLimiteDepot"
              name="dateLimiteDepot"
              className={styles.inputText}
            />
          </div>
        </div>
      </div>
      <button
        className={styles.postButton}
        disabled={formData.departement === "" ? true : false}
      >
        Créer
      </button>
    </form>
  );
};

export default AddCommission;
