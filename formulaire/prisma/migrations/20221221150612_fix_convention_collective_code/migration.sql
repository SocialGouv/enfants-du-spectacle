/*
  Warnings:

  - You are about to drop the column `conventionCollectiveCode` on the `Dossier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Demandeur" ADD COLUMN     "conventionCollectiveCode" TEXT;

-- AlterTable
ALTER TABLE "Dossier" DROP COLUMN "conventionCollectiveCode";
