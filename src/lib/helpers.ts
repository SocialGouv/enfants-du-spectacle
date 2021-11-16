import type { Dossier, SocieteProduction, User } from "@prisma/client";
import { grandeCategorieToCategorieValues } from "src/lib/categories";
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
    searchResults.dossiers
      .map((p) => p.societeProduction)
      .concat(searchResults.enfants.map((e) => e.dossier.societeProduction))
  );
}

type FilterDossierFn = (dossier: Dossier) => boolean;

function filterDossierFn(filters: DossiersFilters): FilterDossierFn {
  return function (dossier: Dossier) {
    return (
      (!filters.userId || dossier.userId == filters.userId) &&
      (!filters.societeProductionId ||
        dossier.societeProductionId == filters.societeProductionId) &&
      (!filters.grandeCategorie ||
        grandeCategorieToCategorieValues(filters.grandeCategorie).includes(
          dossier.categorie
        ))
    );
  };
}

function filterCommissions(
  commissions: CommissionData[],
  filters: DossiersFilters
): CommissionData[] {
  const filterFn = filterDossierFn(filters);
  return commissions.map((commission) => ({
    ...commission,
    dossiers: commission.dossiers.filter(filterFn),
  }));
}

function filterSearchResults(
  searchResults: SearchResultsType,
  filters: DossiersFilters
): SearchResultsType {
  const filterFn = filterDossierFn(filters);
  return {
    dossiers: searchResults.dossiers.filter(filterFn),
    enfants: searchResults.enfants.filter((enfant) => filterFn(enfant.dossier)),
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
      commissions.flatMap((c) => c.dossiers.map((p) => p.societeProduction))
    );
  }
}

function frenchDepartementName(departementNumber: string): string {
  return (
    {
      "75": "Paris",
      "77": "Seine?",
      "78": "Yvelines",
      "91": "Essone",
      "92": "Hauts-de-Seine",
      "93": "Seine-Saint-Denis",
      "94": "Seine et Marne",
      "95": "Val d'Oise",
    }[departementNumber] ?? "Hors Île-de-France"
  );
}

export {
  filterCommissions,
  filterSearchResults,
  frenchDateText,
  frenchDepartementName,
  getFilterableSocietesProductions,
  searchResultsToSocieteProductions,
  shortUserName,
  uniqueById,
};
