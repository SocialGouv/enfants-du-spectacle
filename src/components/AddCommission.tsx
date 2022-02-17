import type { Commission } from "@prisma/client";
import { useSession } from "next-auth/react";
import * as React from "react";
import styles from "src/components/AddComment.module.scss";

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
  const { data: session } = useSession();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.currentTarget.value,
    });
    console.log("formData : ", formData);
  };

  return (
    <form
      className={styles.Form}
      onSubmit={(e) => {
        setFormData({
          ...formData,
          date: new Date(),
          dossierId: dossierId,
          text: "",
          user: session?.dbUser,
          userId: session?.dbUser.id,
        });
        e.currentTarget.value = "";
        saveCommission(e, formData);
      }}
    >
      <div>
        <div className="Form--field">
          <input
            onChange={handleForm}
            type="text"
            id="departement"
            className={styles.areaText}
          />
          <input
            onChange={handleForm}
            type="text"
            id="date"
            className={styles.areaText}
          />
          <input
            onChange={handleForm}
            type="text"
            id="dateLimiteDepot"
            className={styles.areaText}
          />
        </div>
      </div>
      <button
        className={styles.postButton}
        disabled={formData.departement === "" ? true : false}
      >
        Poster
      </button>
    </form>
  );
};

export default AddCommission;
