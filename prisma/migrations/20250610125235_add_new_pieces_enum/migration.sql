-- CreateEnum
CREATE TYPE "SectionPdf" AS ENUM ('TEXTES_LEGAUX', 'CONSIDERANTS', 'ARTICLE_2', 'ARTICLE_3', 'ARTICLE_4', 'SIGNATURE', 'RECOURS');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "JustificatifEnfant" ADD VALUE 'AVIS_PEDAGOGIQUE_1ER_DEGRE';
ALTER TYPE "JustificatifEnfant" ADD VALUE 'AVIS_PEDAGOGIQUE_2ND_DEGRE';
ALTER TYPE "JustificatifEnfant" ADD VALUE 'AVIS_DASEN';

-- CreateTable
CREATE TABLE "ContenuPdf" (
    "id" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "section" "SectionPdf" NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "utilisateurModifierId" INTEGER,

    CONSTRAINT "ContenuPdf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContenuPdf_departement_section_key" ON "ContenuPdf"("departement", "section");

-- AddForeignKey
ALTER TABLE "ContenuPdf" ADD CONSTRAINT "ContenuPdf_utilisateurModifierId_fkey" FOREIGN KEY ("utilisateurModifierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
