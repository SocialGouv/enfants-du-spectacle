import type { CategorieDossier, JustificatifDossier } from "@prisma/client";
import fs from "fs";
import { createCommission } from "src/__tests_lib/factories/commission";
import { createDemandeur } from "src/__tests_lib/factories/demandeur";
import { createSocieteProduction } from "src/__tests_lib/factories/societeProduction";
import { truncateDb } from "src/__tests_lib/helpers";
import prismaClient from "src/lib/prismaClient";
import type { Dossier as DossierDS } from "src/synchronize/demarchesSimplifiees";
import { parseDossier, upsertDossier } from "src/synchronize/dossier";

test("parseDemandeur works", () => {
  const dossierDS = JSON.parse(
    fs.readFileSync(`${__dirname}/dossier_6944923.json`).toString()
  ) as DossierDS;
  const parsed = parseDossier(dossierDS);
  expect(parsed.categorie).toEqual("LONG_METRAGE");
  expect(parsed.dateDebut).toEqualYearMonthAndDate(new Date(2022, 4, 2));
  expect(parsed.dateFin).toEqualYearMonthAndDate(new Date(2022, 4, 22));
  expect(parsed.justificatifs).toEqual(["MESURES_SECURITE", "SCENARIO"]);
  expect(parsed.nom).toEqual("Le château ambulant");
  expect(parsed.numeroDS).toEqual(6944923);
  expect(parsed.presentation).toEqual(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  expect(parsed.scenesSensibles).toEqual(["Hauteur", "Nudité / Actes sexuels"]);
});

describe("upsert", () => {
  beforeEach(truncateDb);

  const data1 = {
    categorie: "LONG_METRAGE" as CategorieDossier,
    dateDebut: new Date(2022, 4, 2),
    dateFin: new Date(2022, 4, 22),
    justificatifs: ["MESURES_SECURITE", "SCENARIO"] as JustificatifDossier[],
    nom: "Le château ambulant",
    numeroDS: 6944923,
    presentation: "super projet",
    scenesSensibles: ["Hauteur"],
  };

  const data2 = {
    categorie: "DANSE" as CategorieDossier,
    dateDebut: new Date(2022, 5, 5),
    dateFin: new Date(2022, 9, 17),
    justificatifs: ["MESURES_SECURITE", "SCENARIO"] as JustificatifDossier[],
    nom: "Enfant du  Destin",
    numeroDS: 6945721,
    presentation: "Repudiandae nesciunt",
    scenesSensibles: [
      "Machines dangereuses, produits chimiques ou agents biologiques",
    ],
  };

  test("upsert simple", async () => {
    const societeProduction = await createSocieteProduction();
    const demandeur = await createDemandeur({
      societeProduction: societeProduction,
    });
    const commission = await createCommission();
    const existing = await prismaClient.dossier.create({
      data: {
        ...data1,
        commissionId: commission.id,
        demandeurId: demandeur.id,
        societeProductionId: societeProduction.id,
      },
    });
    const result1 = await upsertDossier(data1, {
      demandeur: demandeur,
      enfants: [],
      societeProduction: societeProduction,
    });
    expect(result1.id).toEqual(existing.id);
    expect(await prismaClient.dossier.count()).toEqual(1);
    const result2 = await upsertDossier(data2, {
      demandeur: demandeur,
      enfants: [],
      societeProduction: societeProduction,
    });
    expect(result2.id).not.toEqual(existing.id);
    expect(await prismaClient.dossier.count()).toEqual(2);
  });

  //   test("upsert different societeProduction", async () => {
  //     const societeProduction = await createSocieteProduction(0);
  //     const existing = await prismaClient.demandeur.create({
  //       data: { ...data1, societeProductionId: societeProduction.id },
  //     });
  //     const societeProduction2 = await createSocieteProduction(1);
  //     const result1 = await upsertDemandeur(data1, societeProduction2);
  //     expect(result1.id).toEqual(existing.id);
  //     expect(await prismaClient.demandeur.count()).toEqual(1);
  //     expect(result1.societeProductionId).toEqual(societeProduction2.id);
  //   });

  //   test("upsert match on email and update", async () => {
  //     const societeProduction = await createSocieteProduction();
  //     const existing = await prismaClient.demandeur.create({
  //       data: { ...data1, societeProductionId: societeProduction.id },
  //     });
  //     const data = {
  //       ...data2,
  //       email: "jean@gaumont.fr",
  //       nom: "Riggio",
  //     };
  //     const result = await upsertDemandeur(data, societeProduction);
  //     expect(result.id).toEqual(existing.id);
  //     expect(await prismaClient.demandeur.count()).toEqual(1);
  //     expect(result.email).toEqual("jean@gaumont.fr");
  //     expect(result.nom).toEqual("Riggio");
  //   });
});
