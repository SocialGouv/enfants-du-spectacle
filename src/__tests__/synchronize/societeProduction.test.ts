import { truncateDb } from "src/__tests_lib/helpers";
import prismaClient from "src/lib/prismaClient";
import type { Dossier as DossierDS } from "src/synchronize/demarchesSimplifiees";
import {
  parseSocieteProduction,
  upsertSocieteProduction,
} from "src/synchronize/societeProduction";

test("parseSocieteProduction works", () => {
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
      "pdf": {
        "url": "https://www.demarches-simplifiees.fr/api/v2/dossiers/pdf/BAh7CEkiCGdpZAY6BkVUSSIuZ2lkOi8vdHBzL0Rvc3NpZXIvNjk0NDkyMz9leHBpcmVzX2luPTM2MDAGOwBUSSIMcHVycG9zZQY7AFRJIgthcGlfdjIGOwBUSSIPZXhwaXJlc19hdAY7AFRJIh0yMDIxLTEyLTAxVDE3OjM0OjI2LjkwM1oGOwBU--4bc220dcd43a22ca24114099fd5ea70c434a1e12"
      },
      "instructeurs": [],
      "groupeInstructeur": {
        "id": "R3JvdXBlSW5zdHJ1Y3RldXItNjYzODY=",
        "number": 66386,
        "label": "défaut"
      },
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
      "messages": [
        {
          "id": "Q29tbWVudGFpcmUtMTY5MzM3NjY=",
          "email": "contact@demarches-simplifiees.fr",
          "body": "[Votre dossier nº 6944923 a bien été déposé (Enfants Du Spectacle)]<br><br>",
          "createdAt": "2021-12-01T17:34:21+01:00",
          "attachment": null
        }
      ],
      "demandeur": {
        "siret": "13002916800015",
        "siegeSocial": true,
        "naf": "8413Z",
        "libelleNaf": "Administration publique (tutelle) des activités économiques",
        "address": {
          "label": "Gaumont\\r\\n19-21\\r\\n19 RUE MADELEINE VIONNET\\r\\n93300 AUBERVILLIERS\\r\\nFRANCE",
          "type": "housenumber",
          "streetAddress": "19 RUE MADELEINE VIONNET",
          "streetNumber": "19",
          "streetName": "MADELEINE VIONNET",
          "postalCode": "93300",
          "cityName": "AUBERVILLIERS",
          "cityCode": "93001",
          "departmentName": null,
          "departmentCode": null,
          "regionName": null,
          "regionCode": null
        },
        "entreprise": {
          "siren": "130029168",
          "capitalSocial": "10000",
          "numeroTvaIntracommunautaire": "FR76130029168",
          "formeJuridique": "SAS à responsabilité limitée",
          "formeJuridiqueCode": "7171",
          "nomCommercial": "",
          "raisonSociale": "Gaumont FR",
          "siretSiegeSocial": "13002916800015",
          "codeEffectifEntreprise": null,
          "dateCreation": "2021-04-01",
          "nom": "Gaumont cinéma",
          "prenom": null,
          "attestationFiscaleAttachment": null,
          "attestationSocialeAttachment": null
        },
        "association": null
      }
    }

  `) as DossierDS;

  const parsed = parseSocieteProduction(dossierDS);

  expect(parsed.nom).toEqual("Gaumont cinéma");
  expect(parsed.siret).toEqual("13002916800015");
  expect(parsed.siren).toEqual("130029168");
  expect(parsed.departement).toEqual("93");
  expect(parsed.naf).toEqual("8413Z");
  expect(parsed.raisonSociale).toEqual("Gaumont FR");
  expect(parsed.adresse).toEqual(
    "Gaumont, 19-21, 19 RUE MADELEINE VIONNET, 93300 AUBERVILLIERS, FRANCE"
  );
  expect(parsed.adresseCodePostal).toEqual("93300");
  expect(parsed.adresseCodeCommune).toEqual("93001");
  expect(parsed.formeJuridique).toEqual("SAS à responsabilité limitée");
  expect(parsed.conventionCollectiveCode).toEqual("3097");
});

describe("upsert", () => {
  beforeEach(truncateDb);
  const data1 = {
    adresse: "10 rue du Char, Paris, France",
    adresseCodeCommune: "75111",
    adresseCodePostal: "75011",
    conventionCollectiveCode: "9030Z",
    departement: "75",
    formeJuridique: "SASU simplifiee",
    naf: "2030",
    nom: "Les Magnifiques",
    raisonSociale: "MAGNIFIQUE CORP",
    siren: "390 009 100",
    siret: "390 009 100 2003 230",
  };
  const data2 = {
    adresse: "20 rue des poulets, Marseille, France",
    adresseCodeCommune: "13102",
    adresseCodePostal: "13002",
    conventionCollectiveCode: "1020B",
    departement: "13",
    formeJuridique: "Association",
    naf: "1022",
    nom: "La scop",
    raisonSociale: "SCOP",
    siren: "100 394 200",
    siret: "100 394 200 1023 942",
  };

  test("upsert simple", async () => {
    const existing = await prismaClient.societeProduction.create({
      data: data1,
    });
    const result1 = await upsertSocieteProduction(data1);
    expect(result1.id).toEqual(existing.id);
    expect(await prismaClient.societeProduction.count()).toEqual(1);
    const result2 = await upsertSocieteProduction(data2);
    expect(result2.id).not.toEqual(existing.id);
    expect(await prismaClient.societeProduction.count()).toEqual(2);
  });

  test("upsert match on SIRET and update", async () => {
    const existing = await prismaClient.societeProduction.create({
      data: data1,
    });
    const data = {
      ...data2,
      nom: "Los perdidos",
      siret: "390 009 100 2003 230",
    };
    const result = await upsertSocieteProduction(data);
    expect(result.id).toEqual(existing.id);
    expect(await prismaClient.societeProduction.count()).toEqual(1);
    expect(result.siret).toEqual("390 009 100 2003 230");
    expect(result.nom).toEqual("Los perdidos");
  });
});
