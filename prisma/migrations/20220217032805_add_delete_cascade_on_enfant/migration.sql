-- DropForeignKey
ALTER TABLE "Enfant" DROP CONSTRAINT "Enfant_dossierId_fkey";

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
