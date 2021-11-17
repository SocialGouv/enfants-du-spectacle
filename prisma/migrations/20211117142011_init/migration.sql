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

-- CreateTable
CREATE TABLE "Commission" (
    "id" SERIAL NOT NULL,
    "departement" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateLimiteDepot" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocieteProduction" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "siret" TEXT,
    "departement" TEXT NOT NULL,

    CONSTRAINT "SocieteProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demandeur" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "societeProductionId" INTEGER NOT NULL,

    CONSTRAINT "Demandeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "numeroDS" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "statut" "StatutDossier" NOT NULL DEFAULT E'CONSTRUCTION',
    "categorie" "CategorieDossier" NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "societeProductionId" INTEGER NOT NULL,
    "userId" INTEGER,
    "demandeurId" INTEGER NOT NULL,
    "justificatifs" "JustificatifDossier"[],

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enfant" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "typeEmploi" "TypeEmploi" NOT NULL,
    "nomPersonnage" TEXT,
    "periodeTravail" TEXT,
    "nombreJours" INTEGER NOT NULL,
    "contexteTravail" TEXT,
    "montantCachet" DOUBLE PRECISION NOT NULL,
    "nombreCachets" INTEGER NOT NULL,
    "remunerationsAdditionnelles" TEXT,
    "remunerationTotale" DOUBLE PRECISION NOT NULL,
    "justificatifs" "JustificatifEnfant"[],
    "dossierId" INTEGER NOT NULL,

    CONSTRAINT "Enfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Demandeur_email_key" ON "Demandeur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Demandeur" ADD CONSTRAINT "Demandeur_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "Demandeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
