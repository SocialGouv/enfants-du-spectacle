-- DropForeignKey
ALTER TABLE "SendList" DROP CONSTRAINT "SendList_userId_fkey";

-- AddForeignKey
ALTER TABLE "SendList" ADD CONSTRAINT "SendList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
