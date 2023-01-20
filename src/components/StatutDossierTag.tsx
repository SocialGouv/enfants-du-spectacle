import type { TagSize } from "@dataesr/react-dsfr";
import type { Dossier } from "@prisma/client";
import React from "react";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
  size?: TagSize;
}

const StatutDossierTag: React.FC<Props> = ({ dossier }) => {
  const stateMachine = statutDossierStateMachineFactory(dossier.statut);
  return (
    <div
      className={`${styles.tag} ${
        stateMachine.stateLabel() === "Prêt"
          ? `${styles.tagGreen}`
          : `${styles.tagYellow}`
      }`}
    >
      {stateMachine.stateLabel().toUpperCase()}
    </div>
  );
};

export default StatutDossierTag;
