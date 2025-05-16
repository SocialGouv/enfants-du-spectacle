-- Fix Missing Columns Migration
-- This migration adds columns that should have been added in the db_consolidation migration
-- but somehow weren't correctly applied in production

-- Dossier user relationship columns
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "creatorId" INTEGER;
-- Check if constraint exists before adding it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                  WHERE constraint_name = 'Dossier_creatorId_fkey' 
                  AND table_name = 'Dossier') THEN
        ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_creatorId_fkey" 
        FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "instructeurId" INTEGER;
-- Check if constraint exists before adding it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                  WHERE constraint_name = 'Dossier_instructeurId_fkey' 
                  AND table_name = 'Dossier') THEN
        ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_instructeurId_fkey" 
        FOREIGN KEY ("instructeurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- Dossier other missing columns
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "commissionString" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "commissionDate" TIMESTAMP(3);
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "collaboratorIds" INTEGER[] DEFAULT '{}';
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "dateCreation" TIMESTAMP(3);
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "scenario" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "securite" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "complementaire" TEXT;

-- Enfant missing columns
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "dateDerniereModification" TIMESTAMP(3);
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "populatedByUserId" INTEGER;
-- Check if constraint exists before adding it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                  WHERE constraint_name = 'Enfant_populatedByUserId_fkey' 
                  AND table_name = 'Enfant') THEN
        ALTER TABLE "Enfant" ADD CONSTRAINT "Enfant_populatedByUserId_fkey" 
        FOREIGN KEY ("populatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- Enfant document link fields
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "livret" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "autorisation" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "situation" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "contrat" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "certificat" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "avis" TEXT;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "checkTravailNuit" BOOLEAN;
ALTER TABLE "Enfant" ADD COLUMN IF NOT EXISTS "textTravailNuit" TEXT;

-- User missing columns
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "telephone" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "fonction" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);

-- Comments fields
ALTER TABLE "Comments" ADD COLUMN IF NOT EXISTS "seen" BOOLEAN;
ALTER TABLE "Comments" ADD COLUMN IF NOT EXISTS "date" TIMESTAMP(3);

-- Check if Remuneration table exists, create if it doesn't
DO $$
BEGIN
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
