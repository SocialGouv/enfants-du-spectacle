-- CreateTable
CREATE TABLE "SendList" (
    "id" SERIAL NOT NULL,
    "send" BOOLEAN NOT NULL,
    "lastSent" TIMESTAMP(3),
    "commissionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SendList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SendList" ADD CONSTRAINT "SendList_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendList" ADD CONSTRAINT "SendList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
