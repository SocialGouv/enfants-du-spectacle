import type { StatutDossier } from "@prisma/client";

interface StateDetail {
  key: string;
  label: string;
}

const statesDetails: Record<string, StateDetail> = {
  ACCEPTE: { key: "accepte", label: "Accepté" },
  AVIS_AJOURNE: { key: "avisAjourne", label: "Avis ajourné" },
  AVIS_DEFAVORABLE: { key: "avisDefavorable", label: "Avis défavorable" },
  AVIS_FAVORABLE: { key: "favorable", label: "Avis favorable" },
  AVIS_FAVORABLE_SOUS_RESERVE: {
    key: "favorableSousReserve",
    label: "Avis favorable sous réserve",
  },
  CONSTRUCTION: { key: "construction", label: "En construction" },
  INSTRUCTION: { key: "instruction", label: "En instruction" },
  PRET: { key: "pret", label: "Prêt" },
  REFUSE: { key: "refuse", label: "Refusé" },
  BROUILLON: { key: "brouillon", label: "Brouillon" },
};

interface StatutDossierStateMachine {
  state: StatutDossier;
  stateDetails: () => StateDetail;
  stateLabel: () => string;
  stateClassName: () => string;
}

const factory = (status: StatutDossier): StatutDossierStateMachine => {
  return {
    state: status,
    stateDetails: function () {
      return statesDetails[this.state] || { key: "unknown", label: "Inconnu" };
    },
    stateLabel: function () {
      return this.stateDetails().label;
    },
    stateClassName: function () {
      return `state-${this.stateDetails().key}`;
    },
  };
};

export { factory };
