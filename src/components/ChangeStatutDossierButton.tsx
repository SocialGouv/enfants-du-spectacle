import { Icon } from "@dataesr/react-dsfr";
import type { Dossier, StatutDossier } from "@prisma/client";
import React, { useState } from "react";
import IconLoader from "src/components/IconLoader";
import StatutDossierTag from "src/components/StatutDossierTag";
import {
  factory as statutDossierFSMFactory,
  statutDossierEventToFrench,
  statutDossierEventToFrenchDescription,
  statutDossierEventToIcon,
} from "src/lib/statutDossierStateMachine";

import styles from "./ChangeStatutDossierButton.module.scss";

interface Props {
  dossier: Dossier;
  onChange: (transitionEvent: string, transitionTo: StatutDossier) => void;
  disabled: boolean;
}

const ChangeStatutDossierButton: React.FC<Props> = ({
  dossier,
  onChange,
  ...otherProps
}) => {
  const disabled = otherProps.disabled || false;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  if (statutDossierFSM.transitionObjects().length == 0) {
    return <StatutDossierTag dossier={dossier} size="lg" />;
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.currentStatut} ${className} ${styles[className]}`}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setDropdownVisible(!dropdownVisible);
        }}
      >
        {statutDossierFSM.stateLabel()}{" "}
        {disabled ? (
          <IconLoader />
        ) : (
          <Icon name="test" className={`${styles.icon} ri-arrow-down-s-fill`} />
        )}
      </button>
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
              onChange(transition.name, transition.to);
            }}
          >
            <span role="img" className={styles.icon} aria-label="test">
              <Icon
                className={statutDossierEventToIcon(transition.name)}
                size="2x"
              />
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
