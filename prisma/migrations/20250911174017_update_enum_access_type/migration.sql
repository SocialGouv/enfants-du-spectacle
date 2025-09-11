/*
  Warnings:

  - The values [PIECE_DOWNLOAD,PIECE_DOSSIEr_UPDATE] on the enum `AccessType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessType_new" AS ENUM ('DOSSIER_LIST', 'DOSSIER_VIEW', 'PIECE_DOSSIER_DOWNLOAD', 'PIECE_ENFANT_DOWNLOAD', 'COMMISSION_LIST', 'DOSSIER_UPDATE', 'ENFANT_UPDATE', 'PIECE_DOSSIER_UPDATE', 'PIECE_ENFANT_UPDATE');
ALTER TABLE "UserLogs" ALTER COLUMN "accessType" TYPE "AccessType_new" USING ("accessType"::text::"AccessType_new");
ALTER TYPE "AccessType" RENAME TO "AccessType_old";
ALTER TYPE "AccessType_new" RENAME TO "AccessType";
DROP TYPE "AccessType_old";
COMMIT;
