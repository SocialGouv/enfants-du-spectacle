/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatutDossier" AS ENUM ('CONSTRUCTION', 'INSTRUCTION', 'PRET', 'AVIS_AJOURNE', 'AVIS_FAVORABLE', 'AVIS_FAVORABLE_SOUS_RESERVE', 'AVIS_DEFAVORABLE', 'ACCEPTE', 'REFUSE');

-- CreateEnum
CREATE TYPE "CategorieDossier" AS ENUM ('LONG_METRAGE', 'COURT_METRAGE', 'TELEFILM', 'SERIE', 'EMISSION_TV', 'CLIP', 'THEATRE', 'DOUBLAGE', 'MUSIQUE_STUDIO', 'COMEDIE_MUSICALE', 'CONCERT', 'OPERA', 'BALLET', 'DANSE', 'CIRQUE', 'RADIO', 'PHOTO', 'FILM_INSTITUTIONNEL', 'JEU_VIDEO', 'VIDEO_EN_LIGNE', 'AUTRE');

-- CreateEnum
CREATE TYPE "JustificatifDossier" AS ENUM ('SYNOPSIS', 'SCENARIO', 'MESURES_SECURITE', 'PLAN_TRAVAIL', 'INFOS_COMPLEMENTAIRES');

-- CreateEnum
CREATE TYPE "TypeEmploi" AS ENUM ('ROLE_1', 'ROLE_2', 'FIGURATION', 'SILHOUETTE', 'SILHOUETTE_PARLANTE', 'DOUBLURE', 'DOUBLAGE', 'CHANT', 'DANSE', 'JEU_VIDEO', 'AUTRE');

-- CreateEnum
CREATE TYPE "JustificatifEnfant" AS ENUM ('LIVRET_FAMILLE', 'AUTORISATION_PARENTALE', 'SITUATION_PARTICULIERE', 'CONTRAT', 'CERTIFICAT_SCOLARITE', 'AVIS_MEDICAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'INSTRUCTEUR', 'MEMBRE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "departement" TEXT,
ADD COLUMN     "departements" TEXT[],
ADD COLUMN     "nom" TEXT,
ADD COLUMN     "prenom" TEXT,
ADD COLUMN     "role" "Role",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SocieteProduction" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "siret" TEXT,
    "siren" TEXT,
    "departement" TEXT,
    "naf" TEXT,
    "raisonSociale" TEXT,
    "adresse" TEXT,
    "adresseCodePostal" TEXT,
    "adresseCodeCommune" TEXT,
    "formeJuridique" TEXT,
    "conventionCollectiveCode" TEXT,

    CONSTRAINT "SocieteProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PieceDossier" (
    "id" SERIAL NOT NULL,
    "dossierId" INTEGER NOT NULL,
    "externalId" TEXT,
    "type" "JustificatifDossier" NOT NULL,
    "link" TEXT,

    CONSTRAINT "PieceDossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "statut" "StatutDossier" NOT NULL DEFAULT 'CONSTRUCTION',
    "categorie" "CategorieDossier",
    "userId" INTEGER NOT NULL,
    "justificatifs" "JustificatifDossier"[],
    "scenesSensibles" TEXT[],
    "presentation" TEXT,
    "conventionCollectiveCode" TEXT,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "number" INTEGER,
    "dateDerniereModification" TIMESTAMP(3),
    "cdc" INTEGER,
    "dateDepot" TIMESTAMP(3),

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PieceDossierEnfant" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "dossierId" INTEGER,
    "externalId" TEXT,
    "type" "JustificatifEnfant" NOT NULL,
    "link" TEXT,

    CONSTRAINT "PieceDossierEnfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enfant" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT,
    "nom" TEXT,
    "dateNaissance" TIMESTAMP(3),
    "typeEmploi" "TypeEmploi" NOT NULL,
    "nomPersonnage" TEXT,
    "periodeTravail" TEXT,
    "nombreJours" INTEGER,
    "contexteTravail" TEXT,
    "montantCachet" DOUBLE PRECISION,
    "nombreCachets" INTEGER DEFAULT 0,
    "nombreLignes" INTEGER DEFAULT 0,
    "remunerationsAdditionnelles" TEXT,
    "remunerationTotale" DOUBLE PRECISION,
    "justificatifs" "JustificatifEnfant"[],
    "dossierId" INTEGER NOT NULL,
    "cdc" INTEGER,
    "adresseEnfant" TEXT,
    "nomRepresentant1" TEXT,
    "prenomRepresentant1" TEXT,
    "adresseRepresentant1" TEXT,
    "adresseRepresentant2" TEXT,
    "nomRepresentant2" TEXT,
    "prenomRepresentant2" TEXT,

    CONSTRAINT "Enfant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PieceDossier" ADD CONSTRAINT "PieceDossier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieceDossierEnfant" ADD CONSTRAINT "PieceDossierEnfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
