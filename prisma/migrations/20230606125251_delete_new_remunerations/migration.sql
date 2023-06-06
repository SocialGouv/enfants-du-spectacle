/*
  Warnings:

  - You are about to drop the `Remuneration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Remuneration" DROP CONSTRAINT "Remuneration_enfantId_fkey";

-- DropTable
DROP TABLE "Remuneration";

-- DropEnum
DROP TYPE "NatureCachet";
