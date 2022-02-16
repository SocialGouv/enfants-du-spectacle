-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_dossierId_fkey";

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
