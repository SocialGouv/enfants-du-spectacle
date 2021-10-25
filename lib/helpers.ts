import type { Agent } from "@prisma/client";

function shortAgentName(agent: Agent): string {
  return `${agent.prenom} ${agent.nom[0]}.`;
}

function frenchDateText(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { frenchDateText, shortAgentName };
