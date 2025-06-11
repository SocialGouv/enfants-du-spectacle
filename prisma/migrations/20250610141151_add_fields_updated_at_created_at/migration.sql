-- CreateEnum
CREATE TYPE "SectionPdf" AS ENUM ('TEXTES_LEGAUX', 'CONSIDERANTS', 'ARTICLE_2', 'ARTICLE_3', 'ARTICLE_4', 'SIGNATURE', 'RECOURS');

-- AlterTable
ALTER TABLE "Demandeur" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PieceDossier" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PieceDossierEnfant" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Remuneration" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SocieteProduction" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

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
