-- CreateEnum
CREATE TYPE "StatutDossier" AS ENUM ('BROUILLON', 'CONSTRUCTION', 'INSTRUCTION', 'PRET', 'AVIS_AJOURNE', 'AVIS_FAVORABLE', 'AVIS_FAVORABLE_SOUS_RESERVE', 'AVIS_DEFAVORABLE', 'ACCEPTE', 'REFUSE');

-- CreateEnum
CREATE TYPE "CategorieDossier" AS ENUM ('LONG_METRAGE', 'COURT_METRAGE', 'TELEFILM', 'SERIE', 'EMISSION_TV', 'DOCUMENTAIRE_FICTIONNEL', 'CLIP', 'THEATRE', 'DOUBLAGE', 'MUSIQUE_STUDIO', 'COMEDIE_MUSICALE', 'CONCERT', 'OPERA', 'BALLET', 'DANSE', 'CIRQUE', 'RADIO', 'PHOTO', 'FILM_INSTITUTIONNEL', 'JEU_VIDEO', 'VIDEO_EN_LIGNE', 'AUTRE');

-- CreateEnum
CREATE TYPE "STATUT_PIECE" AS ENUM ('VALIDE', 'REFUSE', 'EN_ATTENTE');

-- CreateEnum
CREATE TYPE "JustificatifDossier" AS ENUM ('SYNOPSIS', 'SCENARIO', 'MESURES_SECURITE', 'PLAN_TRAVAIL', 'INFOS_COMPLEMENTAIRES');

-- CreateEnum
CREATE TYPE "StatusNotif" AS ENUM ('NOUVEAU', 'MIS_A_JOUR');

-- CreateEnum
CREATE TYPE "Source" AS ENUM ('FORM_DS', 'FORM_EDS');

-- CreateEnum
CREATE TYPE "Sourcecomment" AS ENUM ('INSTRUCTEUR', 'SOCIETE_PROD');

-- CreateEnum
CREATE TYPE "TypeEmploi" AS ENUM ('ROLE_1', 'ROLE_2', 'FIGURATION', 'SILHOUETTE', 'SILHOUETTE_PARLANTE', 'DOUBLURE', 'DOUBLAGE', 'CHANT', 'CHORISTE', 'CIRCASSIEN', 'MUSICIEN', 'DANSE', 'JEU_VIDEO', 'AUTRE');

-- CreateEnum
CREATE TYPE "JustificatifEnfant" AS ENUM ('LIVRET_FAMILLE', 'AUTORISATION_PARENTALE', 'SITUATION_PARTICULIERE', 'CONTRAT', 'CERTIFICAT_SCOLARITE', 'AVIS_MEDICAL', 'DECLARATION_HONNEUR', 'BON_PRISE_EN_CHARGE', 'AUTORISATION_PRISE_EN_CHARGE');

-- CreateEnum
CREATE TYPE "TypeConsultation" AS ENUM ('THALIE', 'GENERALISTE', 'UNNEEDED');

-- CreateEnum
CREATE TYPE "TypeConsultationMedecin" AS ENUM ('PHYSIQUE', 'PIECE', 'PRISE_EN_CHARGE', 'MEDECIN_TRAITANT');

-- CreateEnum
CREATE TYPE "NatureCachet" AS ENUM ('CACHET_TOURNAGE', 'CACHET_DOUBLAGE', 'CACHET_REPRESENTATION', 'CACHET_REPETITION', 'CACHET_HORAIRE', 'CACHET_SECURITE', 'CACHET_POST_SYNCHRO', 'CACHET_CAPTATION', 'CACHET_SPECTACLE_VIVANT', 'CACHET_RETAKE', 'AUTRE_GARANTIE', 'AUTRE_ADDITIONNELLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'INSTRUCTEUR', 'MEMBRE', 'MEDECIN');

-- CreateTable
CREATE TABLE "Commission" (
    "id" SERIAL NOT NULL,
    "departement" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateLimiteDepot" TIMESTAMP(3) NOT NULL,
    "lastSent" TIMESTAMP(3),
    "archived" BOOLEAN,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

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
    "otherConventionCollective" TEXT,

    CONSTRAINT "SocieteProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demandeur" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "phone" TEXT,
    "fonction" TEXT,
    "conventionCollectiveCode" TEXT,
    "otherConventionCollective" TEXT,
    "societeProductionId" INTEGER,

    CONSTRAINT "Demandeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PieceDossier" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "dossierId" INTEGER NOT NULL,
    "externalId" TEXT,
    "type" "JustificatifDossier" NOT NULL,
    "link" TEXT,
    "statut" "STATUT_PIECE",

    CONSTRAINT "PieceDossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "statut" "StatutDossier" NOT NULL DEFAULT 'BROUILLON',
    "categorie" "CategorieDossier",
    "commissionId" INTEGER,
    "commissionString" TEXT,
    "commissionDate" TIMESTAMP(3),
    "societeProductionId" INTEGER,
    "numeroDS" INTEGER DEFAULT 0,
    "externalId" TEXT,
    "number" INTEGER,
    "instructeurId" INTEGER,
    "creatorId" INTEGER,
    "medecinId" INTEGER,
    "collaboratorIds" INTEGER[],
    "demandeurId" INTEGER,
    "justificatifs" "JustificatifDossier"[],
    "scenesSensibles" TEXT[],
    "presentation" TEXT,
    "scenario" TEXT,
    "securite" TEXT,
    "complementaire" TEXT,
    "conventionCollectiveCode" TEXT,
    "otherConventionCollective" TEXT,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "dateCreation" TIMESTAMP(3),
    "dateDerniereModification" TIMESTAMP(3),
    "dateDepot" TIMESTAMP(3),
    "cdc" INTEGER,
    "statusNotification" "StatusNotif",
    "source" "Source",

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "dossierId" INTEGER NOT NULL,
    "seen" BOOLEAN,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "source" "Sourcecomment" NOT NULL,
    "dossierId" INTEGER NOT NULL,
    "enfantId" INTEGER,
    "commentsId" INTEGER,
    "userId" INTEGER,
    "externalUserId" INTEGER,
    "sender" TEXT,
    "seen" BOOLEAN,
    "date" TIMESTAMP(3),

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PieceDossierEnfant" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "enfantId" INTEGER NOT NULL,
    "dossierId" INTEGER,
    "externalId" TEXT,
    "type" "JustificatifEnfant" NOT NULL,
    "link" TEXT,
    "statut" "STATUT_PIECE",

    CONSTRAINT "PieceDossierEnfant_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Enfant" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT,
    "nom" TEXT,
    "dateNaissance" TIMESTAMP(3),
    "typeEmploi" "TypeEmploi",
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
    "telRepresentant1" TEXT,
    "mailRepresentant1" TEXT,
    "adresseRepresentant2" TEXT,
    "nomRepresentant2" TEXT,
    "prenomRepresentant2" TEXT,
    "telRepresentant2" TEXT,
    "mailRepresentant2" TEXT,
    "externalId" TEXT,
    "typeConsultation" "TypeConsultation",
    "typeConsultationMedecin" "TypeConsultationMedecin",
    "dateConsultation" TIMESTAMP(3),
    "dateDerniereModification" TIMESTAMP(3),
    "populatedByUserId" INTEGER,
    "checkTravailNuit" BOOLEAN,
    "textTravailNuit" TEXT,
    "livret" TEXT,
    "autorisation" TEXT,
    "situation" TEXT,
    "contrat" TEXT,
    "certificat" TEXT,
    "avis" TEXT,

    CONSTRAINT "Enfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendList" (
    "id" SERIAL NOT NULL,
    "send" BOOLEAN NOT NULL,
    "lastSent" TIMESTAMP(3),
    "commissionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "fonction" TEXT,
    "emailVerified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role",
    "departement" TEXT,
    "departements" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "SocieteProduction_siret_key" ON "SocieteProduction"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Demandeur_email_key" ON "Demandeur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_externalId_key" ON "Dossier"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Enfant_externalId_key" ON "Enfant"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- AddForeignKey
ALTER TABLE "Demandeur" ADD CONSTRAINT "Demandeur_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieceDossier" ADD CONSTRAINT "PieceDossier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_societeProductionId_fkey" FOREIGN KEY ("societeProductionId") REFERENCES "SocieteProduction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_instructeurId_fkey" FOREIGN KEY ("instructeurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "Demandeur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieceDossierEnfant" ADD CONSTRAINT "PieceDossierEnfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remuneration" ADD CONSTRAINT "Remuneration_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_populatedByUserId_fkey" FOREIGN KEY ("populatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendList" ADD CONSTRAINT "SendList_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendList" ADD CONSTRAINT "SendList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

