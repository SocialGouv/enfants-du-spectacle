import type { Enfant } from "@prisma/client";
import React from "react";
import styles from "src/components/EnfantCdc.module.scss";
import {
  birthDateToFrenchAge,
  frenchDateText,
  typeEmploiLabel,
} from "src/lib/helpers";

interface Props {
  enfant: Enfant;
  saveEnfant: (e: React.FormEvent, data: Enfant, enfant: Enfant) => void;
}

const EnfantCdc: React.FC<Props> = ({ enfant, saveEnfant }) => {
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });

  const [changes, setChanges] = React.useState<boolean>(false);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
    setChanges(true);
  };

  const selectText = (): void => {
    const input = document.getElementById(`cdc_${enfant.id}`);
    input.focus();
    input.select();
  };

  return (
    <div className={styles.enfantRow}>
      <div className={styles.wrapper}>
        <div className={styles.name}>
          {enfant.nom} {enfant.prenom}
        </div>
        <div
          title={`${frenchDateText(enfant.dateNaissance)}`}
          className="hoverableTitle"
        >
          {birthDateToFrenchAge(enfant.dateNaissance)}
        </div>
        <div>{typeEmploiLabel(enfant.typeEmploi)}</div>
        <div>
          <form
            className={styles.Form}
            onSubmit={(e) => {
              e.currentTarget.value = "";
              saveEnfant(e, formData, enfant);
              setChanges(false);
            }}
          >
            <div>
              <div className={styles.formField}>
                <div className={styles.inputContainer}>
                  <input
                    onChange={handleForm}
                    onClick={selectText}
                    type="text"
                    id={`cdc_${enfant.id}`}
                    name="cdc"
                    className={styles.inputText}
                    value={formData.cdc ? formData.cdc : 0}
                  />{" "}
                  %
                </div>
                <button
                  className={styles.postButton}
                  disabled={changes ? false : true}
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnfantCdc;
