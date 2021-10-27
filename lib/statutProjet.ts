import StateMachine from "javascript-state-machine";

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

const statutProjetFSMFactory = StateMachine.factory({
  init: "CONSTRUCTION",
  transitions: [
    { from: "CONSTRUCTION", name: "passerInstruction", to: "INSTRUCTION" },
    { from: "INSTRUCTION", name: "repasserConstruction", to: "CONSTRUCTION" },
    { from: "INSTRUCTION", name: "passerPret", to: "PRET" },
    { from: "PRET", name: "repasserInstruction", to: "INSTRUCTION" },
    { from: "PRET", name: "passerAjourne", to: "AVIS_AJOURNE" },
    { from: "PRET", name: "passerFavorable", to: "AVIS_FAVORABLE" },
    {
      from: "PRET",
      name: "passerFavorableSousReserve",
      to: "AVIS_FAVORABLE_SOUS_RESERVE",
    },
    { from: "PRET", name: "passerDefavorable", to: "AVIS_DEFAVORABLE" },
    { from: "AVIS_AJOURNE", name: "passerFavorable", to: "AVIS_FAVORABLE" },
    {
      from: "AVIS_AJOURNE",
      name: "passerFavorableSousReserve",
      to: "AVIS_FAVORABLE_SOUS_RESERVE",
    },
    { from: "AVIS_AJOURNE", name: "passerDefavorable", to: "AVIS_DEFAVORABLE" },
    { from: "AVIS_FAVORABLE", name: "passerAccepte", to: "ACCEPTE" },
    { from: "AVIS_FAVORABLE", name: "passerRefuse", to: "REFUSE" },
    { from: "AVIS_DEFAVORABLE", name: "passerAccepte", to: "ACCEPTE" },
    { from: "AVIS_DEFAVORABLE", name: "passerRefuse", to: "REFUSE" },
  ],
});

const statutProjetToFrench = (state: StatutProjetStr): string => names[state];

export { statutProjetFSMFactory, statutProjetToFrench };
export type { StatutProjetStr };
