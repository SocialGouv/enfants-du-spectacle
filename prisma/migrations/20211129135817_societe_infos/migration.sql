-- AlterTable
ALTER TABLE "SocieteProduction"
  ADD COLUMN     "siren" TEXT,
  ADD COLUMN     "adresse" TEXT,
  ADD COLUMN     "adresseCodeCommune" TEXT,
  ADD COLUMN     "adresseCodePostal" TEXT,
  ADD COLUMN     "formeJuridique" TEXT,
  ADD COLUMN     "naf" TEXT,
  ADD COLUMN     "raisonSociale" TEXT;

UPDATE "Dossier"
SET "societeProductionId"=(SELECT id FROM "SocieteProduction" WHERE "nom"='BAGAN FILMS')
WHERE "societeProductionId" IN (
  SELECT id FROM "SocieteProduction" WHERE "nom" in ('MONEGASQUE DES ONDES', 'FLYING MUSIC COMPANY', 'OPERA NATIONAL DE PARIS 92')
);

UPDATE "Demandeur"
SET "societeProductionId"=(SELECT id FROM "SocieteProduction" WHERE "nom"='BAGAN FILMS')
WHERE "societeProductionId" IN (
  SELECT id FROM "SocieteProduction" WHERE "nom" in ('MONEGASQUE DES ONDES', 'FLYING MUSIC COMPANY', 'OPERA NATIONAL DE PARIS 92')
);

DELETE FROM "SocieteProduction" WHERE "nom" in ('MONEGASQUE DES ONDES', 'FLYING MUSIC COMPANY', 'OPERA NATIONAL DE PARIS 92');

UPDATE "SocieteProduction" SET
  "siren"='410334239',
  "siret"='41033423900036',
  "adresse"='1560 route de quarante sous, 78630 Orgeval',
  "adresseCodeCommune"='78466',
  "adresseCodePostal"='78630',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5911A',
  "raisonSociale"='17-23 production'
  WHERE "nom"='17 PRODUCTION';

UPDATE "SocieteProduction" SET
  "siren"='422694000',
  "siret"='42269400000031',
  "adresse"='12 rue de la tapisserie, 60000 Beauvais',
  "adresseCodeCommune"='60057',
  "adresseCodePostal"='60000',
  "formeJuridique"='Association déclarée',
  "naf"='9001Z',
  "raisonSociale"='A vrai dire'
  WHERE "nom"='A VRAI DIRE';

UPDATE "SocieteProduction" SET
  "siren"='509484648',
  "siret"='50948464800050',
  "adresse"='32 avenue de flandre, 75019 Paris 19',
  "adresseCodeCommune"='75119',
  "adresseCodePostal"='75019',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5911C',
  "raisonSociale"='Bagan films'
  WHERE "nom"='BAGAN FILMS';

UPDATE "SocieteProduction" SET
  "siren"='410301469',
  "siret"='41030146900020',
  "adresse"='21 rue du fbg st antoine, 75011 Paris 11',
  "adresseCodeCommune"='75111',
  "adresseCodePostal"='75011',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5911C',
  "raisonSociale"='Cine nomine'
  WHERE "nom"='CINE NOMINE';

UPDATE "SocieteProduction" SET
  "siren"='479592172',
  "siret"='47959217200015',
  "adresse"='10 rue mayet, 75006 Paris 6',
  "adresseCodeCommune"='75116',
  "adresseCodePostal"='75006',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5911C',
  "raisonSociale"='Explicit films'
  WHERE "nom"='EXPLICIT FILMS';

UPDATE "SocieteProduction" SET
  "siren"='752805770',
  "siret"='75280577000019',
  "adresse"='10 b rue bisson, 75020 Paris 20',
  "adresseCodeCommune"='75120',
  "adresseCodePostal"='75020',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5911C',
  "raisonSociale"='Mona films'
  WHERE "nom"='MONA FILMS';

UPDATE "SocieteProduction" SET
  "siren"='834120248',
  "siret"='83412024800010',
  "adresse"='59 rue du fbg st antoine, 75011 Paris 11',
  "adresseCodeCommune"='75111',
  "adresseCodePostal"='75011',
  "formeJuridique"='"SAS, société par actions simplifiée"',
  "naf"='5911C',
  "raisonSociale"='Mondayman productions'
  WHERE "nom"='MONDAYMAN';

UPDATE "SocieteProduction" SET
  "siren"='489553743',
  "siret"='48955374300019',
  "adresse"='52 rue gerard, 75013 Paris 13',
  "adresseCodeCommune"='75113',
  "adresseCodePostal"='75013',
  "formeJuridique"='SA à conseil dʼadministration (s.a.i.)',
  "naf"='5911A',
  "raisonSociale"='Mondo tv france'
  WHERE "nom"='MONDO TV France';

UPDATE "SocieteProduction" SET
  "siren"='414346619',
  "siret"='41434661900011',
  "adresse"='23 rue boyer, 75020 Paris 20',
  "adresseCodeCommune"='75120',
  "adresseCodePostal"='75020',
  "formeJuridique"='Association déclarée',
  "naf"='9001Z',
  "raisonSociale"='Les productions de balthazar'
  WHERE "nom"='BALTHAZAR LES PRODUCTIONS';

UPDATE "SocieteProduction" SET
  "siren"='352344865',
  "siret"='35234486500048',
  "adresse"='56 grande rue, 77630 Barbizon',
  "adresseCodeCommune"='77022',
  "adresseCodePostal"='77630',
  "formeJuridique"='Société à responsabilité limitée (sans autre indication)',
  "naf"='5912Z',
  "raisonSociale"='Dome productions (DP)'
  WHERE "nom"='DOME PRODUCTIONS';

ALTER TABLE "SocieteProduction"
  ALTER COLUMN "adresseCodeCommune" SET NOT NULL,
  ALTER COLUMN "adresseCodePostal" SET NOT NULL,
  ALTER COLUMN "formeJuridique" SET NOT NULL,
  ALTER COLUMN "naf" SET NOT NULL,
  ALTER COLUMN "raisonSociale" SET NOT NULL,
  ALTER COLUMN "siren" SET NOT NULL,
  ALTER COLUMN "siret" SET NOT NULL;
