import { Button } from "@dataesr/react-dsfr";
import React, { useState } from "react";
import {
  factory as statutDossierFSMFactory,
  statutDossierEventToFrench,
  statutDossierEventToFrenchDescription,
} from "src/lib/statutDossierStateMachine";

import styles from "./ChangeStatutDossierButton.module.scss";
import type { Dossier } from ".prisma/client";

interface Props {
  dossier: Dossier;
  onChange: (transitionEvent: string) => void;
}

const ChangeStatutDossierButton: React.FC<Props> = ({ dossier, onChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  return (
    <div className={styles.container}>
      <Button
        className={`${styles.currentStatut} ${className}`}
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        {statutDossierFSM.stateLabel()}
      </Button>
      <div
        className={styles.dropdown}
        style={{ visibility: dropdownVisible ? "visible" : "hidden" }}
      >
        {statutDossierFSM.transitionObjects().map((transition) => (
          <button
            key={transition.name}
            className={styles.row}
            onClick={() => {
              setDropdownVisible(false);
              onChange(transition.name);
            }}
          >
            <span role="img" className={styles.icon} aria-label="test">
              ✏️
            </span>
            <div>
              <p className={styles.event}>
                {statutDossierEventToFrench(transition.name)}
              </p>
              <p className={styles.description}>
                {statutDossierEventToFrenchDescription(transition.name)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeStatutDossierButton;
