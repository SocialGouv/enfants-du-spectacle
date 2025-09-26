-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "dateConflictDetectedAt" TIMESTAMP(3),
ADD COLUMN     "hasDateConflict" BOOLEAN DEFAULT false;
