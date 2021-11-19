if [[ -e .env ]]
then
  set -o allexport; source .env; set +o allexport;
fi

if [[ -z $DATABASE_URL ]]
then
  echo "missing DATABASE_URL env var"
  exit
fi

psql -d $DATABASE_URL eds1 -c 'TRUNCATE "Account", "Commission", "Demandeur", "Dossier", "Enfant", "Session", "SocieteProduction", "User";';
pg_restore -d $DATABASE_URL prisma/seeds/dump.pg_dump
