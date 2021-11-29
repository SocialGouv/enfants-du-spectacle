-- AlterTable
ALTER TABLE "Demandeur" ADD COLUMN "fonction" TEXT;
UPDATE "Demandeur" SET "fonction"='Assistant de production' WHERE "fonction" IS NULL;
ALTER TABLE "Demandeur" ALTER COLUMN "fonction" SET NOT NULL;
