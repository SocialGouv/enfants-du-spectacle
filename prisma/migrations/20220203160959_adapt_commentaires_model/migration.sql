/*
  Warnings:

  - Made the column `userId` on table `Commentaire` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_userId_fkey";

-- AlterTable
ALTER TABLE "Commentaire" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
