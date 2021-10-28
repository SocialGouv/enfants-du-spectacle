import StateMachine from "javascript-state-machine";

import type { StatutProjet } from ".prisma/client";

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
};

const events = {
  passerAccepte: "Passer en accepté",
  passerAjourne: "Marquer comme ajourné",
  passerDefavorable: "Marquer comme avis défavorable de la commission",
  passerFavorable: "Marquer comme avis favorable de la commission",
  passerFavorableSousReserve:
    "Marquer comme avis favorable sous réserve de la commission",
  passerInstruction: "Passer en instruction",
  passerPret: "Marquer prêt pour la commission",
  passerRefuse: "Passer en refusé",
  repasserConstruction: "Repasser en construction",
  repasserInstruction: "Repasser en instruction",
};
type TransitionEvent = keyof typeof events;

type StatutProjetStr =
  | "ACCEPTE"
  | "AVIS_AJOURNE"
  | "AVIS_DEFAVORABLE"
  | "AVIS_FAVORABLE_SOUS_RESERVE"
  | "AVIS_FAVORABLE"
  | "CONSTRUCTION"
  | "INSTRUCTION"
  | "PRET"
  | "REFUSE";

interface TransitionObject {
  from: StatutProjetStr[];
  name: TransitionEvent;
  to: StatutProjetStr;
}

interface StatutProjetStateMachine {
  state: StatutProjet;
  transitions: () => TransitionEvent[];
  transitionObjects: () => TransitionObject[];
  stateDetails: () => StateDetail;
  stateLabel: () => string;
  stateClassName: () => string;
}

const transitions: TransitionObject[] = [
  { from: ["CONSTRUCTION"], name: "passerInstruction", to: "INSTRUCTION" },
  { from: ["INSTRUCTION"], name: "repasserConstruction", to: "CONSTRUCTION" },
  { from: ["INSTRUCTION"], name: "passerPret", to: "PRET" },
  { from: ["PRET"], name: "repasserInstruction", to: "INSTRUCTION" },
  { from: ["PRET"], name: "passerAjourne", to: "AVIS_AJOURNE" },
  {
    from: ["PRET", "AVIS_AJOURNE"],
    name: "passerFavorable",
    to: "AVIS_FAVORABLE",
  },
  {
    from: ["PRET"],
    name: "passerFavorableSousReserve",
    to: "AVIS_FAVORABLE_SOUS_RESERVE",
  },
  {
    from: ["PRET", "AVIS_AJOURNE"],
    name: "passerDefavorable",
    to: "AVIS_DEFAVORABLE",
  },
  {
    from: ["AVIS_AJOURNE"],
    name: "passerFavorableSousReserve",
    to: "AVIS_FAVORABLE_SOUS_RESERVE",
  },
  {
    from: ["AVIS_FAVORABLE", "AVIS_DEFAVORABLE"],
    name: "passerAccepte",
    to: "ACCEPTE",
  },
  {
    from: ["AVIS_FAVORABLE", "AVIS_DEFAVORABLE"],
    name: "passerRefuse",
    to: "REFUSE",
  },
];

const factory = (init = "CONSTRUCTION"): StatutProjetStateMachine => {
  const fsm = new StateMachine({
    init,
    transitions,
  }) as StatutProjetStateMachine;
  fsm.transitionObjects = function () {
    return transitions.filter((t) => t.from.includes(this.state));
  };
  fsm.stateDetails = function () {
    return statesDetails[this.state];
  };
  fsm.stateLabel = function () {
    return this.stateDetails().label;
  };
  fsm.stateClassName = function () {
    return `state-${this.stateDetails().key}`;
  };
  return fsm;
};

const statutProjetEventToFrench = (event: TransitionEvent): string =>
  events[event];

export { factory, statutProjetEventToFrench };
export type { StatutProjetStr, TransitionEvent };
