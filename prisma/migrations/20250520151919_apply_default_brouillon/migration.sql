-- Alter table Dossier only if the column exists and has a different default
DO $$
BEGIN
    -- Set default on "statut" only if column exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Dossier' AND column_name = 'statut'
    ) THEN
        ALTER TABLE "Dossier" ALTER COLUMN "statut" SET DEFAULT 'BROUILLON';
    END IF;

    -- Drop default on "collaboratorIds" only if it has one
    IF EXISTS (
        SELECT column_default FROM information_schema.columns 
        WHERE table_name = 'Dossier' AND column_name = 'collaboratorIds'
        AND column_default IS NOT NULL
    ) THEN
        ALTER TABLE "Dossier" ALTER COLUMN "collaboratorIds" DROP DEFAULT;
    END IF;
END $$;
