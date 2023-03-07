-- CreateEnum
CREATE TYPE "CommentNotif" AS ENUM ('COMMENTAIRE_ENFANT', 'COMMENTAIRE_PROJET');

-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "commentNotification" "CommentNotif";
