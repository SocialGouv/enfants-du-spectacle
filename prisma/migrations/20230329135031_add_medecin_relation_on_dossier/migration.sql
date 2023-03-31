-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "medecinId" INTEGER;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
