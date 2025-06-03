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
  const stateClassName = stateMachine.stateClassName();
  return (
    <div
      className={`${styles.tag} ${stateClassName}`}
    >
      {stateMachine.stateLabel().toUpperCase()}
    </div>
  );
};

export default StatutDossierTag;
