/*
  Warnings:

  - A unique constraint covering the columns `[numeroDS]` on the table `Dossier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dossier_numeroDS_key" ON "Dossier"("numeroDS");
