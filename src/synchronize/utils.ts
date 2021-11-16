import { parse } from "date-fns";
import { fr } from "date-fns/locale";
import type {
  Champ,
  Dossier as DossierDS,
} from "src/synchronize/demarchesSimplifiees";

function parseDate(str: string): Date {
  return parse(str, "dd MMMM yyyy", new Date(), { locale: fr });
}

function transliterate(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^\W+/, "")
    .replace(/\W+$/, "")
    .replace(/\W/g, "_");
}

interface HasLabel {
  label: string;
}

function champsByLabel<Type extends HasLabel>(
  champs: Type[]
): Record<string, Type> {
  const obj: Record<string, Type> = {};
  for (const champ of champs) {
    if (!champ.label) continue;
    const lab = transliterate(champ.label);
    obj[lab] = champ;
  }
  return obj;
}

function getValue<Type extends Champ>(
  champs: Record<string, Type | undefined>,
  labelTransliterated: string,
  required = true
): string {
  const champ = champs[labelTransliterated];
  if (required && (champ === undefined || !champ.stringValue))
    throw Error(`missing ${labelTransliterated}`);
  return champ?.stringValue ?? "";
}

function groupChamps<Type extends HasLabel>(
  champs: Type[],
  stopLabels: string[]
): Type[][] {
  const matchIndexes = champs
    .map((champ, idx) => ({
      idx,
      match: stopLabels.includes(transliterate(champ.label)),
    }))
    .filter((r) => r.match)
    .map((r) => r.idx);
  return matchIndexes.map((matchIdx, count) => {
    const nextMatchIdx =
      count < matchIndexes.length - 1 ? matchIndexes[matchIdx + 1] : undefined;
    return champs.slice(matchIdx, nextMatchIdx);
  });
}

type ChampsByLabel = Record<string, Champ | undefined>;

function groupChampsDossierDS(
  dossierDS: DossierDS
): Record<string, ChampsByLabel> {
  const [champsDemandeur, champsDossier, champsEnfants] = groupChamps(
    dossierDS.champs,
    [
      "informations_liees_au_demandeur",
      "projet",
      "informations_liees_aux_enfants",
    ]
  ).map(champsByLabel);
  return {
    demandeur: champsDemandeur,
    dossier: champsDossier,
    enfants: champsEnfants,
  };
}

export {
  champsByLabel,
  getValue,
  groupChamps,
  groupChampsDossierDS,
  parseDate,
  transliterate,
};
