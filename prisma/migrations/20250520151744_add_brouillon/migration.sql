-- Add enum value 'BROUILLON' only if it doesn't exist
DO $$
DECLARE
    enum_exists BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'BROUILLON' 
        AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'StatutDossier'
        )
    ) INTO enum_exists;

    IF NOT enum_exists THEN
        ALTER TYPE "StatutDossier" ADD VALUE 'BROUILLON';
    END IF;
END $$;

