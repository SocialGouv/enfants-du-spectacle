import StateMachine from "javascript-state-machine";

import type { StatutProjet } from ".prisma/client";

const names = {
  ACCEPTE: "Accepté",
  AVIS_AJOURNE: "Avis ajourné",
  AVIS_DEFAVORABLE: "Avis défavorable",
  AVIS_FAVORABLE: "Avis favorable",
  AVIS_FAVORABLE_SOUS_RESERVE: "Avis favorable sous réserve",
  CONSTRUCTION: "En construction",
  INSTRUCTION: "En instruction",
  PRET: "Prêt",
  REFUSE: "Refusé",
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

interface StatutProjetStateMachine {
  state: StatutProjet;
  transitions: () => TransitionEvent[];
}

const transitions = [
  { from: "CONSTRUCTION", name: "passerInstruction", to: "INSTRUCTION" },
  { from: "INSTRUCTION", name: "repasserConstruction", to: "CONSTRUCTION" },
  { from: "INSTRUCTION", name: "passerPret", to: "PRET" },
  { from: "PRET", name: "repasserInstruction", to: "INSTRUCTION" },
  { from: "PRET", name: "passerAjourne", to: "AVIS_AJOURNE" },
  {
    from: ["PRET", "AVIS_AJOURNE"],
    name: "passerFavorable",
    to: "AVIS_FAVORABLE",
  },
  {
    from: "PRET",
    name: "passerFavorableSousReserve",
    to: "AVIS_FAVORABLE_SOUS_RESERVE",
  },
  {
    from: ["PRET", "AVIS_AJOURNE"],
    name: "passerDefavorable",
    to: "AVIS_DEFAVORABLE",
  },
  {
    from: "AVIS_AJOURNE",
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
  return new StateMachine({ init, transitions }) as StatutProjetStateMachine;
};

const statutProjetToFrench = (state: StatutProjetStr): string => names[state];
const statutProjetEventToFrench = (event: TransitionEvent): string =>
  events[event];

export { factory, statutProjetEventToFrench, statutProjetToFrench };
export type { StatutProjetStr, TransitionEvent };
