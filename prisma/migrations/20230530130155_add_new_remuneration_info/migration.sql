-- CreateEnum
CREATE TYPE "NatureCachet" AS ENUM ('CACHET_TOURNAGE', 'CACHET_DOUBLAGE', 'CACHET_REPRESENTATION', 'CACHET_REPETITION', 'CACHET_HORAIRE', 'CACHET_SECURITE', 'CACHET_POST_SYNCHRO', 'CACHET_CAPTATION', 'CACHET_SPECTACLE_VIVANT', 'CACHET_RETAKE', 'AUTRE_GARANTIE', 'AUTRE_ADDITIONNELLE');

-- CreateTable
CREATE TABLE "Remuneration" (
    "id" SERIAL NOT NULL,
    "typeRemuneration" TEXT,
    "natureCachet" "NatureCachet",
    "autreNatureCachet" TEXT,
    "montant" DOUBLE PRECISION,
    "nombre" INTEGER DEFAULT 0,
    "nombreLignes" INTEGER DEFAULT 0,
    "totalDadr" DOUBLE PRECISION,
    "comment" TEXT,
    "enfantId" INTEGER,

    CONSTRAINT "Remuneration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Remuneration" ADD CONSTRAINT "Remuneration_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
