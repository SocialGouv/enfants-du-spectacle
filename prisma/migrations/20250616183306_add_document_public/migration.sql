-- CreateEnum
CREATE TYPE "CategorieDocument" AS ENUM ('CALENDRIER_COMMISSION_HORS_92', 'CALENDRIER_COMMISSION_HORS_92', 'MODELE_AUTORISATION', 'MODELE_DASEN', 'GUIDE_ENFANT_SPECTACLE', 'CIRCULAIRE');

-- CreateTable
CREATE TABLE "DocumentPublic" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "categorie" "CategorieDocument" NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentPublic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_documentPublic_categorie" ON "DocumentPublic"("categorie");

-- CreateIndex
CREATE INDEX "idx_documentPublic_uploadedBy" ON "DocumentPublic"("uploadedBy");

-- AddForeignKey
ALTER TABLE "DocumentPublic" ADD CONSTRAINT "DocumentPublic_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
