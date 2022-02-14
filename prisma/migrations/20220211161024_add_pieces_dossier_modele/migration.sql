-- CreateTable
CREATE TABLE "PieceDossierEnfant" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "type" "JustificatifEnfant" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "PieceDossierEnfant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PieceDossierEnfant" ADD CONSTRAINT "PieceDossierEnfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
