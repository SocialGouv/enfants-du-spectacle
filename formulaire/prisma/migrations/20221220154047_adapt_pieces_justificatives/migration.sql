/*
  Warnings:

  - Added the required column `nom` to the `PieceDossier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PieceDossier" ADD COLUMN     "nom" TEXT NOT NULL;
