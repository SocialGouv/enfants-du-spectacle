import { Button } from "@dataesr/react-dsfr";
import React, { useState } from "react";
import {
  factory as statutProjetFSMFactory,
  statutProjetEventToFrench,
  statutProjetEventToFrenchDescription,
} from "src/lib/statutProjetStateMachine";

import styles from "./ChangeStatutProjetButton.module.scss";
import type { Projet } from ".prisma/client";

interface Props {
  projet: Projet;
  onChange: (transitionEvent: string) => void;
}

const ChangeStatutProjetButton: React.FC<Props> = ({ projet, onChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const statutProjetFSM = statutProjetFSMFactory(projet.statut as string);
  const className = statutProjetFSM.stateClassName();

  return (
    <div className={styles.container}>
      <Button
        className={`${styles.currentStatut} ${className}`}
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        {statutProjetFSM.stateLabel()}
      </Button>
      <div
        className={styles.dropdown}
        style={{ visibility: dropdownVisible ? "visible" : "hidden" }}
      >
        {statutProjetFSM.transitionObjects().map((transition) => (
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
                {statutProjetEventToFrench(transition.name)}
              </p>
              <p className={styles.description}>
                {statutProjetEventToFrenchDescription(transition.name)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeStatutProjetButton;
