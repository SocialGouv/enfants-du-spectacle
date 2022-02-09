-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_userId_fkey";

-- AlterTable
ALTER TABLE "Commentaire" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
