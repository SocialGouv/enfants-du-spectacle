/*
  Warnings:

  - A unique constraint covering the columns `[siret]` on the table `SocieteProduction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Demandeur" DROP CONSTRAINT "Demandeur_societeProductionId_fkey";

-- AlterTable
ALTER TABLE "Demandeur" ALTER COLUMN "societeProductionId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SocieteProduction_siret_key" ON "SocieteProduction"("siret");

-- AddForeignKey
ALTER TABLE "Demandeur" ADD CONSTRAINT "Demandeur_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("siret") ON DELETE SET NULL ON UPDATE CASCADE;
