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
  passerAccepte: {
    description:
      "Une notification et les documents seronts envoyés au demandeur",
    label: "Accepter",
  },
  passerAjourne: {
    description: "La décision sera prise à une commission ultérieure",
    label: "Marquer comme ajourné",
  },
  passerDefavorable: {
    description:
      "La commission s'est prononcée négativement. Le rejet n'est pas encore définitif.",
    label: "Avis défavorable",
  },
  passerFavorable: {
    description:
      "La commission s'est prononcée positivement. L'acceptation n'est pas encore effective.",
    label: "Avis favorable",
  },
  passerFavorableSousReserve: {
    description: "Par exemple, si certains documents sont manquants",
    label: "Avis favorable sous réserve",
  },
  passerInstruction: {
    description: "Le dossier ne pourra plus être modifié",
    label: "Passer en instruction",
  },
  passerPret: {
    description: "Le dossier peut passer en commission",
    label: "Prêt pour la commission",
  },
  passerRefuse: {
    description:
      "La notification de rejet doit être envoyée et justifiée manuellement",
    label: "Refuser",
  },
  repasserConstruction: {
    description: "Le dossier redeviendra modifiable",
    label: "Repasser en construction",
  },
  repasserInstruction: {
    description: "Le dossier n'est pas prêt à passer en commission",
    label: "Repasser en instruction",
  },
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
  events[event].label;

const statutProjetEventToFrenchDescription = (event: TransitionEvent): string =>
  events[event].description;

export {
  factory,
  statutProjetEventToFrench,
  statutProjetEventToFrenchDescription,
};
export type { StatutProjetStr, TransitionEvent };
