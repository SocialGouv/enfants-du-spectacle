-- CreateEnum
CREATE TYPE "TypeConsultationMedecin" AS ENUM ('PHYSIQUE', 'PIECE', 'PRISE_EN_CHARGE', 'MEDECIN_TRAITANT');

-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "typeConsultationMedecin" "TypeConsultationMedecin";
