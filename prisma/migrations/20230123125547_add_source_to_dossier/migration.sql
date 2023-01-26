-- CreateEnum
CREATE TYPE "Source" AS ENUM ('FORM_DS', 'FORM_EDS');

-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "source" "Source";
