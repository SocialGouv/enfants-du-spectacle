import { Tag } from "@dataesr/react-dsfr";
import type { TagSize } from "@dataesr/react-dsfr/components/interface/Tag";
import type { Dossier } from "@prisma/client";
import React from "react";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";

interface Props {
  dossier: Dossier;
  size?: TagSize;
}

const StatutDossierTag: React.FC<Props> = ({ dossier, size }) => {
  const stateMachine = statutDossierStateMachineFactory(dossier.statut);
  const stateClass = stateMachine.stateClassName();
  return (
    <Tag className={stateClass} size={size}>
      {stateMachine.stateLabel()}
    </Tag>
  );
};

export default StatutDossierTag;
