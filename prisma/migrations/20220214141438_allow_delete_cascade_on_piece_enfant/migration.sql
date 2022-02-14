-- DropForeignKey
ALTER TABLE "PieceDossierEnfant" DROP CONSTRAINT "PieceDossierEnfant_enfantId_fkey";

-- AddForeignKey
ALTER TABLE "PieceDossierEnfant" ADD CONSTRAINT "PieceDossierEnfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
