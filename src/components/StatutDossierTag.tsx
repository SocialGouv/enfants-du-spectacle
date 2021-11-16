import { Tag } from "@dataesr/react-dsfr";
import React from "react";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";

import type { Dossier } from ".prisma/client";

interface Props {
  dossier: Dossier;
}

const StatutDossierTag: React.FC<Props> = ({ dossier }) => {
  const stateMachine = statutDossierStateMachineFactory(dossier.statut);
  const stateClass = stateMachine.stateClassName();
  return <Tag className={stateClass}>{stateMachine.stateLabel()}</Tag>;
};

export default StatutDossierTag;
