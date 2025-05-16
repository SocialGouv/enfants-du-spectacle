-- Fix Missing Columns Migration
-- This migration adds columns that should have been added in the db_consolidation migration
-- but somehow weren't correctly applied in production

-- Dossier user relationship columns
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "creatorId" INTEGER;
ALTER TABLE "Dossier" ADD CONSTRAINT IF NOT EXISTS "Dossier_creatorId_fkey" 
    FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "instructeurId" INTEGER;
ALTER TABLE "Dossier" ADD CONSTRAINT IF NOT EXISTS "Dossier_instructeurId_fkey" 
    FOREIGN KEY ("instructeurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "Enfant" ADD CONSTRAINT IF NOT EXISTS "Enfant_populatedByUserId_fkey" 
    FOREIGN KEY ("populatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- Verification query to list all newly added columns
-- This query will produce a report of which columns exist after running this migration
SELECT 
    table_name, 
    column_name,
    data_type
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name IN ('Dossier', 'Enfant', 'User', 'Comments')
    AND column_name IN (
        'creatorId', 'instructeurId', 'commissionString', 'commissionDate', 'collaboratorIds',
        'dateCreation', 'scenario', 'securite', 'complementaire',
        'dateDerniereModification', 'populatedByUserId', 'livret', 'autorisation',
        'situation', 'contrat', 'certificat', 'avis', 'checkTravailNuit', 'textTravailNuit',
        'telephone', 'fonction', 'createdAt', 'updatedAt', 'seen', 'date'
    )
ORDER BY 
    table_name, column_name;
