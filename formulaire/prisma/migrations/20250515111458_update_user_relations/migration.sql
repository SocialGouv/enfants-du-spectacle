/*
  Warnings:

  - You are about to drop the column `userId` on the `Dossier` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Enfant` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Dossier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dossier" DROP CONSTRAINT "Dossier_userId_fkey";

-- DropForeignKey
ALTER TABLE "Enfant" DROP CONSTRAINT "Enfant_userId_fkey";

-- AlterTable
ALTER TABLE "Dossier" DROP COLUMN "userId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enfant" DROP COLUMN "userId",
ADD COLUMN     "populatedByUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_populatedByUserId_fkey" FOREIGN KEY ("populatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
