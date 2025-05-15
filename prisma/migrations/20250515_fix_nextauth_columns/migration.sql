-- Rename Session table columns to match what NextAuth expects
ALTER TABLE "Session" RENAME COLUMN "sessionToken" TO "session_token";
ALTER TABLE "Session" RENAME COLUMN "userId" TO "user_id";

-- Rename Account table columns to match what NextAuth expects
ALTER TABLE "Account" RENAME COLUMN "userId" TO "user_id" IF EXISTS;
ALTER TABLE "Account" RENAME COLUMN "providerAccountId" TO "provider_account_id" IF EXISTS;
