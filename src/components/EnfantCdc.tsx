import type { Enfant } from "@prisma/client";
import React from "react";
import styles from "src/components/EnfantCdc.module.scss";
import {
  birthDateToFrenchAge,
  frenchDateText,
  typeEmploiLabel,
} from "src/lib/helpers";
import { useSWRConfig } from "swr";

interface Props {
  enfant: Enfant;
}

/*interface PropCdc {
  cdc: number;
}*/

const EnfantCdc: React.FC<Props> = ({ enfant }) => {
  const { mutate } = useSWRConfig();
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.currentTarget.value,
    });
    mutate(`/api/enfant/${formData.id}`, { ...formData }, false).catch(
      (err) => {
        throw err;
      }
    );
    /*updateEnfant(dossier, { userId }, () => {
      mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
        throw e;
      });
    });*/
  };

  return (
    <div>
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
          <form className={styles.Form}>
            <div>
              <div className={styles.formField}>
                <div>
                  <input
                    onChange={handleForm}
                    type="text"
                    id="cdc"
                    name="cdc"
                    className={styles.inputText}
                    value={formData.cdc ? formData.cdc : 0}
                  />{" "}
                  %
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnfantCdc;
