import type { StatutDossier } from "@prisma/client";
import StateMachine from "javascript-state-machine";

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
    icon: "ri-checkbox-circle-line",
    label: "Accepter",
  },
  passerAjourne: {
    description: "La décision sera prise à une commission ultérieure",
    icon: "ri-time-line",
    label: "Marquer comme ajourné",
  },
  passerDefavorable: {
    description:
      "La commission s'est prononcée négativement. Le rejet n'est pas encore définitif.",
    icon: "ri-close-circle-line",
    label: "Avis défavorable",
  },
  passerFavorable: {
    description:
      "La commission s'est prononcée positivement. L'acceptation n'est pas encore effective.",
    icon: "ri-shield-check-line",
    label: "Avis favorable",
  },
  passerFavorableSousReserve: {
    description: "Par exemple, si certains documents sont manquants",
    icon: "ri-checkbox-blank-circle-line",
    label: "Avis favorable sous réserve",
  },
  passerInstruction: {
    description: "Le dossier ne pourra plus être modifié",
    icon: "ri-edit-line",
    label: "Passer en instruction",
  },
  passerPret: {
    description: "Le dossier peut passer en commission",
    icon: "ri-check-double-line",
    label: "Prêt pour la commission",
  },
  passerRefuse: {
    description:
      "La notification de rejet doit être envoyée et justifiée manuellement",
    icon: "ri-close-circle-line",
    label: "Refuser",
  },
  repasserConstruction: {
    description: "Le dossier redeviendra modifiable",
    icon: "ri-file-edit-line",
    label: "Repasser en construction",
  },
  repasserInstruction: {
    description: "Le dossier n'est pas prêt à passer en commission",
    icon: "ri-edit-line",
    label: "Repasser en instruction",
  },
};
type TransitionEvent = keyof typeof events;

type StatutDossierStr =
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
  from: StatutDossierStr[];
  name: TransitionEvent;
  to: StatutDossierStr;
}

interface StatutDossierStateMachine {
  state: StatutDossier;
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

const factory = (init = "CONSTRUCTION"): StatutDossierStateMachine => {
  const fsm = new StateMachine({
    init,
    transitions,
  }) as StatutDossierStateMachine;
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

const statutDossierEventToFrench = (event: TransitionEvent): string =>
  events[event].label;

const statutDossierEventToFrenchDescription = (
  event: TransitionEvent
): string => events[event].description;

const statutDossierEventToIcon = (event: TransitionEvent): string =>
  events[event].icon;

export {
  factory,
  statutDossierEventToFrench,
  statutDossierEventToFrenchDescription,
  statutDossierEventToIcon,
};
export type { StatutDossierStr, TransitionEvent };
