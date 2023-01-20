/*
  Warnings:

  - Added the required column `statusNotification` to the `Dossier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusNotif" AS ENUM ('NOUVEAU', 'MIS_A_JOUR');

-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "statusNotification" "StatusNotif";
