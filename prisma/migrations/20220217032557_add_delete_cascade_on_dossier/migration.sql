-- DropForeignKey
ALTER TABLE "Dossier" DROP CONSTRAINT "Dossier_commissionId_fkey";

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
