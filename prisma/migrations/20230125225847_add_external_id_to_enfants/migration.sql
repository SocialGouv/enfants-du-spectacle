/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Enfant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dossier" ALTER COLUMN "numeroDS" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "externalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Enfant_externalId_key" ON "Enfant"("externalId");
