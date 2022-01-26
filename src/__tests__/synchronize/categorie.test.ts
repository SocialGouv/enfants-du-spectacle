import { parseCategorie } from "src/synchronize/categorie";

// Film long métrage
// Film moyen ou court métrage
// Téléfilm
// Série
// Emission TV
// Clip
// Pièce de théâtre
// Enregistrement doublage
// Enregistrement musique en studio
// Comédie musicale
// Concert
// Opéra
// Ballet
// Spectacle de danse
// Cirque
// Emission radio
// Photo
// Film institutionnel
// Compétition de jeux vidéo
// Plateforme de vidéos en ligne
// Autre

test("parseCategorie long metrage", () => {
  expect(parseCategorie("Film long métrage")).toEqual("LONG_METRAGE");
});

test("parseCategorie Téléfilm", () => {
  expect(parseCategorie("Téléfilm")).toEqual("TELEFILM");
});

test("parseCategorie autre", () => {
  expect(parseCategorie("Autre")).toEqual("AUTRE");
});
