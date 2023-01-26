/*
  Warnings:

  - The `societeProductionId` column on the `Demandeur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Demandeur" DROP CONSTRAINT "Demandeur_societeProductionId_fkey";

-- AlterTable
ALTER TABLE "Demandeur" DROP COLUMN "societeProductionId",
ADD COLUMN     "societeProductionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Demandeur" ADD CONSTRAINT "Demandeur_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
