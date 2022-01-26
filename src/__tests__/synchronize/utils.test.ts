import {
  champsByLabel,
  groupChamps,
  parseDate,
  transliterate,
} from "src/synchronize/utils";

test("parseDate works", () => {
  const parsed = parseDate("13 novembre 2021");
  expect(parsed.getFullYear()).toEqual(2021);
  expect(parsed.getMonth()).toEqual(10); // 0 index
  expect(parsed.getDate()).toEqual(13);
});

test("transliterate works", () => {
  expect(transliterate("Nîmes nʼest pas-tout- ")).toEqual(
    "nimes_n_est_pas_tout"
  );
});

test("champsByLabel", () => {
  const champs = [
    { label: "Informations liées au demandeur " },
    { label: "Prénom", stringValue: "Jean Jacques" },
    { label: "Nom", stringValue: "Durand" },
  ];
  const grouped = champsByLabel(champs);
  expect(Object.keys(grouped)).toEqual([
    "informations_liees_au_demandeur",
    "prenom",
    "nom",
  ]);
  expect(grouped.prenom.stringValue).toEqual("Jean Jacques");
});

test("groupChamps with 1 enfant", () => {
  const champs = [
    { label: "Prénom(s)" },
    { label: "coucou" },
    { label: "sympa" },
  ];
  const grouped = groupChamps(champs, ["prenom_s"]);
  expect(grouped.length).toEqual(1);
  expect(grouped[0][0].label).toEqual("Prénom(s)");
  expect(grouped[0][1].label).toEqual("coucou");
  expect(grouped[0][2].label).toEqual("sympa");
});

test("groupChamps with 2 enfants", () => {
  const champs = [
    { label: "Prénom(s)" },
    { label: "coucou" },
    { label: "sympa" },
    { label: "Prénom(s)" },
    { label: "stop" },
    { label: "fam" },
  ];
  const grouped = groupChamps(champs, ["prenom_s"]);
  expect(grouped.length).toEqual(2);
  expect(grouped[0][0].label).toEqual("Prénom(s)");
  expect(grouped[0][1].label).toEqual("coucou");
  expect(grouped[0][2].label).toEqual("sympa");
  expect(grouped[1][0].label).toEqual("Prénom(s)");
  expect(grouped[1][1].label).toEqual("stop");
  expect(grouped[1][2].label).toEqual("fam");
});

test("groupChamps with various Labels", () => {
  const champs = [
    { label: "Informations liées au demandeur " },
    { label: "Prénom", stringValue: "Jean Jacques" },
    { label: "Nom", stringValue: "Durand" },
    { label: "Projet" },
    { label: "Nom", stringValue: "Le château ambulant" },
    { label: "Catégorie" },
  ];
  const grouped = groupChamps(champs, [
    "projet",
    "informations_liees_au_demandeur",
  ]);
  expect(grouped.length).toEqual(2);
  expect(grouped[0][0].label).toEqual("Informations liées au demandeur ");
  expect(grouped[0][1].label).toEqual("Prénom");
  expect(grouped[0][2].label).toEqual("Nom");
  expect(grouped[0][2].stringValue).toEqual("Durand");
  expect(grouped[1][0].label).toEqual("Projet");
  expect(grouped[1][1].label).toEqual("Nom");
  expect(grouped[1][1].stringValue).toEqual("Le château ambulant");
  expect(grouped[1][2].label).toEqual("Catégorie");
});
