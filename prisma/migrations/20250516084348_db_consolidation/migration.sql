-- Database Consolidation Migration
-- This migration makes the necessary changes to align the database schema with the consolidated prisma model

-- Make required fields optional in SocieteProduction
ALTER TABLE "SocieteProduction" ALTER COLUMN "nom" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "siret" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "siren" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "departement" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "naf" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "raisonSociale" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "adresse" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "adresseCodePostal" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "adresseCodeCommune" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "formeJuridique" DROP NOT NULL;
ALTER TABLE "SocieteProduction" ALTER COLUMN "conventionCollectiveCode" DROP NOT NULL;

-- Make required fields optional in Demandeur
ALTER TABLE "Demandeur" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "Demandeur" ALTER COLUMN "nom" DROP NOT NULL;
ALTER TABLE "Demandeur" ALTER COLUMN "prenom" DROP NOT NULL;
ALTER TABLE "Demandeur" ALTER COLUMN "fonction" DROP NOT NULL;
ALTER TABLE "Demandeur" ALTER COLUMN "societeProductionId" DROP NOT NULL;

-- Make required fields optional in Dossier
ALTER TABLE "Dossier" ALTER COLUMN "nom" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "categorie" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "commissionId" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "societeProductionId" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "demandeurId" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "presentation" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "dateDebut" DROP NOT NULL;
ALTER TABLE "Dossier" ALTER COLUMN "dateFin" DROP NOT NULL;

-- Make required fields optional in Enfant
ALTER TABLE "Enfant" ALTER COLUMN "prenom" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "nom" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "dateNaissance" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "typeEmploi" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "nombreJours" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "montantCachet" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "nombreCachets" DROP NOT NULL;
ALTER TABLE "Enfant" ALTER COLUMN "remunerationTotale" DROP NOT NULL;

-- Make link fields optional
ALTER TABLE "PieceDossier" ALTER COLUMN "link" DROP NOT NULL;
ALTER TABLE "PieceDossierEnfant" ALTER COLUMN "link" DROP NOT NULL;

-- Note: All enum values below likely already exist from previous migrations
-- DOCUMENTAIRE_FICTIONNEL value already exists in CategorieDossier from migration 20230412160241
-- CHORISTE, CIRCASSIEN, MUSICIEN values already exist in TypeEmploi from migrations in February 2023
-- MEDECIN value already exists in Role from migration 20230317113328
-- MEMBRE value already exists in Role from migration 20220503130820
-- BON_PRISE_EN_CHARGE and AUTORISATION_PRISE_EN_CHARGE values already exist in JustificatifEnfant 
-- from migrations 20230330123235 and 20230330123346
-- TypeConsultation likely already exists from migration 20230323144204
-- TypeConsultationMedecin likely already exists from migration 20230329151222
-- Source likely already exists from migration 20230123125547
-- StatusNotif likely already exists from migration 20230117124647
-- Sourcecomment likely already exists for Comments table
-- STATUT_PIECE likely already exists from migration 20230126203156

-- Change default value for Dossier.statut to BROUILLON
-- Note: We'll use a dynamic approach that works whether BROUILLON exists or not
DO $$
BEGIN
    -- First check if we have the BROUILLON enum value
    IF EXISTS (SELECT 1 FROM pg_enum 
               WHERE enumlabel = 'BROUILLON' 
               AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'statutdossier')) THEN
        -- If it exists, set it as default
        ALTER TABLE "Dossier" ALTER COLUMN "statut" SET DEFAULT 'BROUILLON'::"StatutDossier";
    ELSE
        -- If it doesn't exist, use CONSTRUCTION as fallback (which should definitely exist)
        ALTER TABLE "Dossier" ALTER COLUMN "statut" SET DEFAULT 'CONSTRUCTION'::"StatutDossier";
    END IF;
END $$;

-- Create or update Remuneration table
DO $$
BEGIN
    -- Check if NatureCachet already exists (may have been created in 20230530130155_add_new_remuneration_info)
    -- and recreate it only if necessary
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'naturecachet') THEN
        CREATE TYPE "NatureCachet" AS ENUM (
            'CACHET_TOURNAGE',
            'CACHET_DOUBLAGE',
            'CACHET_REPRESENTATION',
            'CACHET_REPETITION',
            'CACHET_HORAIRE',
            'CACHET_SECURITE',
            'CACHET_POST_SYNCHRO',
            'CACHET_CAPTATION',
            'CACHET_SPECTACLE_VIVANT',
            'CACHET_RETAKE',
            'AUTRE_GARANTIE',
            'AUTRE_ADDITIONNELLE'
        );
    END IF;
    
    -- Check if the Remuneration table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Remuneration') THEN
        
        -- Create the Remuneration table
        CREATE TABLE "Remuneration" (
            "id" SERIAL PRIMARY KEY,
            "typeRemuneration" TEXT,
            "natureCachet" "NatureCachet",
            "autreNatureCachet" TEXT,
            "montant" DOUBLE PRECISION,
            "nombre" INTEGER DEFAULT 0,
            "nombreLignes" INTEGER DEFAULT 0,
            "totalDadr" DOUBLE PRECISION,
            "comment" TEXT,
            "enfantId" INTEGER,
            FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE SET NULL
        );
    END IF;
END $$;

-- Add missing columns from formulaire app if they don't exist
DO $$
BEGIN
    -- Add Dossier fields
    -- Add creatorId column to Dossier
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'creatorId') THEN
        ALTER TABLE "Dossier" ADD COLUMN "creatorId" INTEGER;
        ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_creatorId_fkey" 
        FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;

    -- Add commissionString column to Dossier
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'commissionString') THEN
        ALTER TABLE "Dossier" ADD COLUMN "commissionString" TEXT;
    END IF;

    -- Add commissionDate column to Dossier
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'commissionDate') THEN
        ALTER TABLE "Dossier" ADD COLUMN "commissionDate" TIMESTAMP(3);
    END IF;

    -- Add collaboratorIds column to Dossier (int array)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'collaboratorIds') THEN
        ALTER TABLE "Dossier" ADD COLUMN "collaboratorIds" INTEGER[] DEFAULT '{}';
    END IF;

    -- Add dateCreation column to Dossier if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'dateCreation') THEN
        ALTER TABLE "Dossier" ADD COLUMN "dateCreation" TIMESTAMP(3);
    END IF;

    -- Add scenario, securite, complementaire columns to Dossier
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'scenario') THEN
        ALTER TABLE "Dossier" ADD COLUMN "scenario" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'securite') THEN
        ALTER TABLE "Dossier" ADD COLUMN "securite" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'complementaire') THEN
        ALTER TABLE "Dossier" ADD COLUMN "complementaire" TEXT;
    END IF;

    -- Add User fields from formulaire app
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'User' 
                  AND column_name = 'telephone') THEN
        ALTER TABLE "User" ADD COLUMN "telephone" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'User' 
                  AND column_name = 'fonction') THEN
        ALTER TABLE "User" ADD COLUMN "fonction" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'User' 
                  AND column_name = 'createdAt') THEN
        ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
        ALTER TABLE "User" ADD COLUMN "updatedAt" TIMESTAMP(3);
    END IF;

    -- Add Enfant dateDerniereModification column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'dateDerniereModification') THEN
        ALTER TABLE "Enfant" ADD COLUMN "dateDerniereModification" TIMESTAMP(3);
    END IF;

    -- Add Enfant document link fields
    -- Add livret column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'livret') THEN
        ALTER TABLE "Enfant" ADD COLUMN "livret" TEXT;
    END IF;

    -- Add autorisation column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'autorisation') THEN
        ALTER TABLE "Enfant" ADD COLUMN "autorisation" TEXT;
    END IF;

    -- Add situation column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'situation') THEN
        ALTER TABLE "Enfant" ADD COLUMN "situation" TEXT;
    END IF;

    -- Add contrat column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'contrat') THEN
        ALTER TABLE "Enfant" ADD COLUMN "contrat" TEXT;
    END IF;

    -- Add certificat column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'certificat') THEN
        ALTER TABLE "Enfant" ADD COLUMN "certificat" TEXT;
    END IF;

    -- Add avis column to Enfant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'avis') THEN
        ALTER TABLE "Enfant" ADD COLUMN "avis" TEXT;
    END IF;

    -- Add checkTravailNuit fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'checkTravailNuit') THEN
        ALTER TABLE "Enfant" ADD COLUMN "checkTravailNuit" BOOLEAN;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'textTravailNuit') THEN
        ALTER TABLE "Enfant" ADD COLUMN "textTravailNuit" TEXT;
    END IF;

    -- Make sure Sourcecomment enum exists before creating the Comments table
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sourcecomment') THEN
        CREATE TYPE "Sourcecomment" AS ENUM (
            'INSTRUCTEUR',
            'SOCIETE_PROD'
        );
    END IF;
    
    -- Create Comments table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Comments') THEN
        -- Create the Comments table first
        CREATE TABLE "Comments" (
            "id" SERIAL PRIMARY KEY,
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
            FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE CASCADE,
            FOREIGN KEY ("enfantId") REFERENCES "Enfant"("id") ON DELETE SET NULL,
            FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL,
            FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
        );
    ELSE
        -- Add fields to Comments table if the table exists
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'Comments' 
                      AND column_name = 'seen') THEN
            ALTER TABLE "Comments" ADD COLUMN "seen" BOOLEAN;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'Comments' 
                      AND column_name = 'date') THEN
            ALTER TABLE "Comments" ADD COLUMN "date" TIMESTAMP(3);
        END IF;
    END IF;
END $$;

-- Add instructeurId column to Dossier if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Dossier' 
                  AND column_name = 'instructeurId') THEN
        ALTER TABLE "Dossier" ADD COLUMN "instructeurId" INTEGER;
        ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_instructeurId_fkey" 
        FOREIGN KEY ("instructeurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- Add populatedByUserId column to Enfant if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'Enfant' 
                  AND column_name = 'populatedByUserId') THEN
        ALTER TABLE "Enfant" ADD COLUMN "populatedByUserId" INTEGER;
        ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_populatedByUserId_fkey" 
        FOREIGN KEY ("populatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- Map data from old to new fields for Dossier (only if both columns exist)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'Dossier' 
               AND column_name = 'userId')
       AND
       EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'Dossier' 
               AND column_name = 'instructeurId') THEN
        
        -- For main app: Update instructeurId with data from userId where applicable
        UPDATE "Dossier" 
        SET "instructeurId" = "userId" 
        WHERE "userId" IS NOT NULL AND "instructeurId" IS NULL;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'Enfant' 
               AND column_name = 'userId')
       AND
       EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'Enfant' 
               AND column_name = 'populatedByUserId') THEN
        
        -- Update populatedByUserId with data from userId where applicable
        UPDATE "Enfant" 
        SET "populatedByUserId" = "userId" 
        WHERE "userId" IS NOT NULL AND "populatedByUserId" IS NULL;
    END IF;
END $$;

-- Drop old userId columns if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'Dossier' 
                AND column_name = 'userId') THEN
        ALTER TABLE "Dossier" DROP COLUMN "userId";
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'Enfant' 
                AND column_name = 'userId') THEN
        ALTER TABLE "Enfant" DROP COLUMN "userId";
    END IF;
END $$;
