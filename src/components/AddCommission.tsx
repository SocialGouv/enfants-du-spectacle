import "react-datepicker/dist/react-datepicker.css";

import { Select } from "@dataesr/react-dsfr";
import type { Commission } from "@prisma/client";
import * as React from "react";
import DatePicker from "react-datepicker";
import styles from "src/components/AddCommission.module.scss";
import { ALL_DEPARTEMENTS, frenchDepartementName } from "src/lib/helpers";

interface Props {
  saveCommission: (e: React.FormEvent, formData: Commission) => void;
}

interface Option {
  label: string | null;
  value: string;
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

  const handleDate = (wichDate: string, date: Date): void => {
    setFormData({
      ...formData,
      [wichDate]: date,
    });
  };

  const defaultDepartement: Option = {
    label: "Département",
    value: "",
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
          <div className={styles.blocForm}>
            <label htmlFor="departement" className="mb-2 italic">
              Département
            </label>
            <div className={styles.selectDpt}>
              <Select
                id="departement"
                name="departement"
                selected={formData.departement ? formData.departement : ""}
                options={[defaultDepartement].concat(
                  ALL_DEPARTEMENTS.map((u) => ({
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
          <div className={styles.blocForm}>
            <label htmlFor="date" className="mb-2 italic">
              Date
            </label>
            <div className={styles.datePickerWrapper}>
              <DatePicker
                selected={formData.date}
                className={styles.inputText}
                onChange={(date: Date) => {
                  handleDate("date", date);
                }}
              />
            </div>
          </div>
          <div className={styles.blocForm}>
            <label htmlFor="dateLimiteDepot" className="mb-2 italic">
              Date limite dépôt
            </label>
            <div className={styles.datePickerWrapper}>
              <DatePicker
                selected={formData.dateLimiteDepot}
                className={styles.inputText}
                onChange={(date: Date) => {
                  handleDate("dateLimiteDepot", date);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="postButton"
        disabled={formData.departement === "" ? true : false}
      >
        Créer
      </button>
    </form>
  );
};

export default AddCommission;
