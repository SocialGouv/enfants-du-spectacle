-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MEMBRE';

-- AlterTable
ALTER TABLE "Commission" ADD COLUMN     "lastSent" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departement" TEXT;
