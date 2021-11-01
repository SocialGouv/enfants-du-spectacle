import type { Projet, SocieteProduction, User } from "@prisma/client";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";

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

function uniqueById<Type extends { id: number }>(array: Type[]): Type[] {
  const map: Map<number, Type> = new Map();
  for (const item of array) {
    map.set(item.id, item);
  }
  return Array.from(map.values());
}

function searchResultsToSocieteProductions(
  searchResults: SearchResultsType
): SocieteProduction[] {
  return uniqueById(
    searchResults.projets
      .map((p) => p.societeProduction)
      .concat(searchResults.enfants.map((e) => e.projet.societeProduction))
  );
}

type FilterProjectFn = (projet: Projet) => boolean;

function filterProjectFn(filters: DossiersFilters): FilterProjectFn {
  return function (projet: Projet) {
    return (
      (!filters.userId || projet.userId == filters.userId) &&
      (!filters.societeProductionId ||
        projet.societeProductionId == filters.societeProductionId)
    );
  };
}

function filterCommissions(
  commissions: CommissionData[],
  filters: DossiersFilters
): CommissionData[] {
  const filterFn = filterProjectFn(filters);
  return commissions.map((commission) => ({
    ...commission,
    projets: commission.projets.filter(filterFn),
  }));
}

function filterSearchResults(
  searchResults: SearchResultsType,
  filters: DossiersFilters
): SearchResultsType {
  const filterFn = filterProjectFn(filters);
  return {
    enfants: searchResults.enfants.filter((enfant) => filterFn(enfant.projet)),
    projets: searchResults.projets.filter(filterFn),
  };
}

function getFilterableSocietesProductions(
  searchResults: SearchResultsType | null,
  commissions: CommissionData[]
): SocieteProduction[] {
  if (searchResults) {
    return searchResultsToSocieteProductions(searchResults);
  } else {
    return uniqueById(
      commissions.flatMap((c) => c.projets.map((p) => p.societeProduction))
    );
  }
}

export {
  filterCommissions,
  filterSearchResults,
  frenchDateText,
  getFilterableSocietesProductions,
  searchResultsToSocieteProductions,
  shortUserName,
  uniqueById,
};
