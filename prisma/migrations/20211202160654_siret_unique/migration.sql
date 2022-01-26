/*
  Warnings:

  - A unique constraint covering the columns `[siret]` on the table `SocieteProduction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocieteProduction_siret_key" ON "SocieteProduction"("siret");
