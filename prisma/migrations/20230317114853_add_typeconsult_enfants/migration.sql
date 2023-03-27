-- CreateEnum
CREATE TYPE "TypeConsultation" AS ENUM ('THALIE', 'GENERALISTE');

-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "typeConsultation" "TypeConsultation";
