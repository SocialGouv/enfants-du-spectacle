/*
  Warnings:

  - Changed the column `commentNotification` on the `Dossier` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Dossier" ALTER COLUMN "commentNotification" SET DATA TYPE "CommentNotif"[];
