/*
  Warnings:

  - Added the required column `nom` to the `PieceDossierEnfant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PieceDossierEnfant" ADD COLUMN     "nom" TEXT NOT NULL;
