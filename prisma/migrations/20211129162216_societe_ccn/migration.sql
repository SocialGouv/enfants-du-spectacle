-- AlterTable
ALTER TABLE "SocieteProduction" ADD COLUMN "conventionCollectiveCode" TEXT;

UPDATE "SocieteProduction" SET "conventionCollectiveCode"='2642' WHERE nom='17 PRODUCTION';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='1285' WHERE nom='A VRAI DIRE';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE nom='BAGAN FILMS';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE nom='CINE NOMINE';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='2642' WHERE nom='EXPLICIT FILMS';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='2642' WHERE nom='MONA FILMS';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE nom='MONDAYMAN';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='2412' WHERE nom='MONDO TV France';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE nom='BALTHAZAR LES PRODUCTIONS';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE nom='DOME PRODUCTIONS';
UPDATE "SocieteProduction" SET "conventionCollectiveCode"='3097' WHERE "conventionCollectiveCode" IS NULL;

ALTER TABLE "SocieteProduction" ALTER COLUMN "conventionCollectiveCode" SET NOT NULL;
