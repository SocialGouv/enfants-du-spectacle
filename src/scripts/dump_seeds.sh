if [[ -e .env ]]
then
  set -o allexport; source .env; set +o allexport;
fi

if [[ -z $DATABASE_URL ]]
then
  echo "missing DATABASE_URL env var"
  exit
fi

rm prisma/seeds/dump.pg_dump
pg_dump $DATABASE_URL \
  --format custom --data-only --no-owner \
  -t '"Commission"' -t '"Demandeur"' -t '"Dossier"' -t '"Enfant"' -t '"SocieteProduction"' -t '"User"' \
  -f prisma/seeds/dump.pg_dump
