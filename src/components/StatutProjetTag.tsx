import { Tag } from "@dataesr/react-dsfr";
import React from "react";
import { factory as statutProjetStateMachineFactory } from "src/lib/statutProjetStateMachine";

import type { Projet } from ".prisma/client";

interface Props {
  projet: Projet;
}

const StatutProjetTag: React.FC<Props> = ({ projet }) => {
  const stateMachine = statutProjetStateMachineFactory(projet.statut);
  const stateClass = stateMachine.stateClassName();
  return <Tag className={stateClass}>{stateMachine.stateLabel()}</Tag>;
};

export default StatutProjetTag;
