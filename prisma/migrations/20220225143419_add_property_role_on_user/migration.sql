-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'INSTRUCTEUR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
