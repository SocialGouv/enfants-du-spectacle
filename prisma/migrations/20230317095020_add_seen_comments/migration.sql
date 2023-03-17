/*
  Warnings:

  - You are about to drop the column `commentNotification` on the `Dossier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commentaire" ADD COLUMN     "seen" BOOLEAN;

-- AlterTable
ALTER TABLE "Dossier" DROP COLUMN "commentNotification";

-- DropEnum
DROP TYPE "CommentNotif";
