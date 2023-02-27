-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_commentsId_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "commentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
