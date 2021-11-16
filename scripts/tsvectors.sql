-- unfortunately, currently not supported by prisma

ALTER TABLE "Dossier" ADD COLUMN searchText tsvector
    GENERATED ALWAYS AS (to_tsvector('french', "nom")) STORED;
CREATE INDEX ts_idx ON "Dossier" USING GIN (searchText);

CREATE INDEX IF NOT EXISTS "dossier_nom_index" ON "Dossier" USING GIN (to_tsvector('french', "nom"));
