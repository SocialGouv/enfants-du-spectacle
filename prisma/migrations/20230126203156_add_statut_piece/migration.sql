-- CreateEnum
CREATE TYPE "STATUT_PIECE" AS ENUM ('VALIDE', 'REFUSE', 'EN_ATTENTE');

-- AlterTable
ALTER TABLE "PieceDossier" ADD COLUMN     "statut" "STATUT_PIECE";

-- AlterTable
ALTER TABLE "PieceDossierEnfant" ADD COLUMN     "statut" "STATUT_PIECE";
