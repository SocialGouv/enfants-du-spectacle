-- unfortunately, currently not supported by prisma

ALTER TABLE "Projet" ADD COLUMN searchText tsvector
    GENERATED ALWAYS AS (to_tsvector('french', "nom")) STORED;
CREATE INDEX ts_idx ON "Projet" USING GIN (searchText);

CREATE INDEX IF NOT EXISTS "projet_nom_index" ON "Projet" USING GIN (to_tsvector('french', "nom"));
