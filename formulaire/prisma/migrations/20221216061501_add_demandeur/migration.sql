-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN     "demandeurId" INTEGER;

-- CreateTable
CREATE TABLE "Demandeur" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "phone" TEXT,
    "fonction" TEXT,
    "societeProductionId" INTEGER,

    CONSTRAINT "Demandeur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Demandeur_email_key" ON "Demandeur"("email");

-- AddForeignKey
ALTER TABLE "Demandeur" ADD CONSTRAINT "Demandeur_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "Demandeur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
