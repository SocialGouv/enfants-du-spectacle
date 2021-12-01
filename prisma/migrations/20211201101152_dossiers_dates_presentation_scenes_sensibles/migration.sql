-- AlterTable
ALTER TABLE "Dossier"
ADD COLUMN     "dateDebut" TIMESTAMP(3),
ADD COLUMN     "dateFin" TIMESTAMP(3),
ADD COLUMN     "presentation" TEXT,
ADD COLUMN     "scenesSensibles" TEXT[];

UPDATE "Dossier"
SET "dateDebut" = '2022-01-01',
"dateFin" = '2022-02-01',
"presentation" = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
"scenesSensibles"= ARRAY['Eau', 'Cascades'];

ALTER TABLE "Dossier"
ALTER COLUMN "dateDebut" SET NOT NULL,
ALTER COLUMN "dateFin" SET NOT NULL,
ALTER COLUMN "presentation" SET NOT NULL,
ALTER COLUMN "scenesSensibles" SET NOT NULL;
