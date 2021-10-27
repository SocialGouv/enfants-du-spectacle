import type { User } from "@prisma/client";

function shortUserName(user: User): string {
  return `${user.prenom} ${user.nom ? user.nom[0] : ""}.`;
}

function frenchDateText(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { frenchDateText, shortUserName };
