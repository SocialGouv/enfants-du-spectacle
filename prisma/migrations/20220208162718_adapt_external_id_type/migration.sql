/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Dossier` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dossier" ALTER COLUMN "externalId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_externalId_key" ON "Dossier"("externalId");
