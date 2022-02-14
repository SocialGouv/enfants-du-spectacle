-- CreateTable
CREATE TABLE "PieceDossier" (
    "id" SERIAL NOT NULL,
    "dossierId" INTEGER NOT NULL,
    "type" "JustificatifDossier" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "PieceDossier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PieceDossier" ADD CONSTRAINT "PieceDossier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
