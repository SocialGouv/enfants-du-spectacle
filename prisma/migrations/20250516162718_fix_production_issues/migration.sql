-- Migration file to fix production database issues
-- Fix column names, add missing columns, and ensure correct types

-- User table: createdAt -> created_at, updatedAt -> updated_at
DO $$
BEGIN
    -- Check if createdAt exists but created_at doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'User' 
              AND column_name = 'createdAt')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'User' 
                      AND column_name = 'created_at') THEN
        
        -- Rename createdAt to created_at
        ALTER TABLE "User" RENAME COLUMN "createdAt" TO "created_at";
    END IF;

    -- Check if updatedAt exists but updated_at doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'User' 
              AND column_name = 'updatedAt')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'User' 
                      AND column_name = 'updated_at') THEN
        
        -- Rename updatedAt to updated_at
        ALTER TABLE "User" RENAME COLUMN "updatedAt" TO "updated_at";
    END IF;
END $$;

-- VerificationToken table: add id column
DO $$
BEGIN
    -- Check if id column doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'VerificationToken' 
                  AND column_name = 'id') THEN
        
        -- Create sequence if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.sequences 
                      WHERE sequence_schema = 'public' 
                      AND sequence_name = 'VerificationToken_id_seq') THEN
            CREATE SEQUENCE "VerificationToken_id_seq";
        END IF;
        
        -- Add id column with correct default value
        ALTER TABLE "VerificationToken" 
        ADD COLUMN "id" SERIAL PRIMARY KEY DEFAULT nextval('"VerificationToken_id_seq"'::regclass);
    END IF;
END $$;

-- Session table: rename columns and fix id type
DO $$
BEGIN
    -- Check if sessionToken exists but session_token doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'Session' 
              AND column_name = 'sessionToken')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'Session' 
                      AND column_name = 'session_token') THEN
        
        -- Rename sessionToken to session_token
        ALTER TABLE "Session" RENAME COLUMN "sessionToken" TO "session_token";
    END IF;

    -- Check if userId exists but user_id doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'Session' 
              AND column_name = 'userId')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = 'public' 
                      AND table_name = 'Session' 
                      AND column_name = 'user_id') THEN
        
        -- Rename userId to user_id
        ALTER TABLE "Session" RENAME COLUMN "userId" TO "user_id";
    END IF;

    -- Change id column type to text if it's not already
    -- First check the current type of id
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'Session' 
        AND column_name = 'id'
        AND data_type != 'text'
    ) THEN
        -- Alter id column type to text
        ALTER TABLE "Session" ALTER COLUMN "id" TYPE text USING "id"::text;
    END IF;
END $$;

-- Add BROUILLON to StatutDossier enum if it doesn't exist
-- First create a function to check if the enum value exists
CREATE OR REPLACE FUNCTION add_enum_value_if_not_exists() RETURNS void AS $$
DECLARE
  enum_exists boolean;
  value_exists boolean;
BEGIN
  -- Check if the enum exists
  SELECT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'statutdossier') INTO enum_exists;
  
  IF enum_exists THEN
    -- Check if the value exists
    SELECT EXISTS(
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'BROUILLON' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'statutdossier')
    ) INTO value_exists;
    
    IF NOT value_exists THEN
      -- Add the value directly if it doesn't exist
      EXECUTE 'ALTER TYPE "StatutDossier" ADD VALUE ''BROUILLON''';
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT add_enum_value_if_not_exists();

-- Clean up the function
DROP FUNCTION add_enum_value_if_not_exists();
