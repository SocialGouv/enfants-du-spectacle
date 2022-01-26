import { createSocieteProduction } from "src/__tests_lib/factories/societeProduction";
import { truncateDb } from "src/__tests_lib/helpers";
import prismaClient from "src/lib/prismaClient";
import { parseDemandeur, upsertDemandeur } from "src/synchronize/demandeur";
import type { Dossier as DossierDS } from "src/synchronize/demarchesSimplifiees";

test("parseDemandeur works", () => {
  const dossierDS = JSON.parse(`
    {
      "id": "RG9zc2llci02OTQ0OTIz",
      "number": 6944923,
      "archived": false,
      "state": "en_construction",
      "dateDerniereModification": "2021-12-01T17:34:21+01:00",
      "datePassageEnConstruction": "2021-12-01T17:34:21+01:00",
      "datePassageEnInstruction": null,
      "dateTraitement": null,
      "motivation": null,
      "motivationAttachment": null,
      "attestation": null,
      "champs": [
        {
          "id": "Q2hhbXAtMjAyNzg2MA==",
          "label": "Informations liées au demandeur ",
          "stringValue": ""
        },
        {
          "id": "Q2hhbXAtMjAyNzg2NA==",
          "label": "Prénom",
          "stringValue": "Jean"
        },
        {
          "id": "Q2hhbXAtMjA2OTg3Mg==",
          "label": "Nom",
          "stringValue": "Lott"
        },
        {
          "id": "Q2hhbXAtMjA2OTg3Mw==",
          "label": "Fonctions",
          "stringValue": "Assistant de prod"
        },
        {
          "id": "Q2hhbXAtMjAyNzg2NQ==",
          "label": "Mail ",
          "stringValue": "ryrybup@gaumont.fr"
        },
        {
          "id": "Q2hhbXAtMjA2Mzg0Mw==",
          "label": "Téléphone ",
          "stringValue": "06 23 59 58 47"
        },
        {
          "id": "Q2hhbXAtMjA2NDExNg==",
          "label": "Convention collective applicable",
          "stringValue": "CCN de la production cinématographique 3097"
        },
        {
          "id": "Q2hhbXAtMjAyNzY4Mw==",
          "label": "Projet",
          "stringValue": ""
        },
        {
          "id": "Q2hhbXAtMjA2NDAxNQ==",
          "label": "Titre du projet",
          "stringValue": "Le château ambulant"
        },
        {
          "id": "Q2hhbXAtMjAyNzY4NA==",
          "label": "Catégorie",
          "stringValue": "Film long métrage"
        }
      ],
      "annotations": [],
      "avis": [],
      "messages": [],
      "demandeur": {
      }
    }
    `) as DossierDS;
  const parsed = parseDemandeur(dossierDS);
  expect(parsed.prenom).toEqual("Jean");
  expect(parsed.nom).toEqual("Lott");
  expect(parsed.fonction).toEqual("Assistant de prod");
  expect(parsed.email).toEqual("ryrybup@gaumont.fr");
  expect(parsed.phone).toEqual("06 23 59 58 47");
});

describe("upsert", () => {
  beforeEach(truncateDb);

  const data1 = {
    email: "jean@gaumont.fr",
    fonction: "Responsable prod",
    nom: "Maputo",
    phone: "06 12 34 56 78",
    prenom: "Jean",
  };
  const data2 = {
    email: "philou@canalmoins.fr",
    fonction: "chef op",
    nom: "spector",
    phone: "06 78 65 43 21",
    prenom: "Phil",
  };

  test("upsert simple", async () => {
    const societeProduction = await createSocieteProduction();
    const existing = await prismaClient.demandeur.create({
      data: { ...data1, societeProductionId: societeProduction.id },
    });
    const result1 = await upsertDemandeur(data1, societeProduction);
    expect(result1.id).toEqual(existing.id);
    expect(await prismaClient.demandeur.count()).toEqual(1);
    const result2 = await upsertDemandeur(data2, societeProduction);
    expect(result2.id).not.toEqual(existing.id);
    expect(await prismaClient.demandeur.count()).toEqual(2);
  });

  test("upsert different societeProduction", async () => {
    const societeProduction = await createSocieteProduction(0);
    const existing = await prismaClient.demandeur.create({
      data: { ...data1, societeProductionId: societeProduction.id },
    });
    const societeProduction2 = await createSocieteProduction(1);
    const result1 = await upsertDemandeur(data1, societeProduction2);
    expect(result1.id).toEqual(existing.id);
    expect(await prismaClient.demandeur.count()).toEqual(1);
    expect(result1.societeProductionId).toEqual(societeProduction2.id);
  });

  test("upsert match on email and update", async () => {
    const societeProduction = await createSocieteProduction();
    const existing = await prismaClient.demandeur.create({
      data: { ...data1, societeProductionId: societeProduction.id },
    });
    const data = {
      ...data2,
      email: "jean@gaumont.fr",
      nom: "Riggio",
    };
    const result = await upsertDemandeur(data, societeProduction);
    expect(result.id).toEqual(existing.id);
    expect(await prismaClient.demandeur.count()).toEqual(1);
    expect(result.email).toEqual("jean@gaumont.fr");
    expect(result.nom).toEqual("Riggio");
  });
});
