-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('DOSSIER_LIST', 'DOSSIER_VIEW', 'PIECE_DOWNLOAD');

-- CreateTable
CREATE TABLE "UserLogs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userEmail" TEXT,
    "userRole" "Role",
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "query" TEXT,
    "modifications" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessType" "AccessType" NOT NULL,
    "resourceId" INTEGER,

    CONSTRAINT "UserLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_userLogs_userId" ON "UserLogs"("userId");

-- CreateIndex
CREATE INDEX "idx_userLogs_accessType" ON "UserLogs"("accessType");

-- CreateIndex
CREATE INDEX "idx_userLogs_timestamp" ON "UserLogs"("timestamp");

-- CreateIndex
CREATE INDEX "idx_userLogs_resourceId" ON "UserLogs"("resourceId");

-- AddForeignKey
ALTER TABLE "UserLogs" ADD CONSTRAINT "UserLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
