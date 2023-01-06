-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
