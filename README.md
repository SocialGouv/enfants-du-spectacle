# Enfants du Spectacle

> Simplifier les demandes d’autorisation d’emplois d’enfants du spectacle pour garantir leur protection

Ce service numérique public est porté par la DRIEETS d’Île-de-France. Il fait partie du programme [beta.gouv.fr](https://beta.gouv.fr) et est développé au sein de [la Fabrique Numérique des Ministères Sociaux](https://fabrique.social.gouv.fr).

![lint workflow](https://github.com/SocialGouv/enfants-du-spectacle/actions/workflows/lint.yml/badge.svg)

# Développement

Stack:
- [NextJS](https://www.nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Prisma](https://www.prisma.io/docs)
- [@dataesr/react-dsfr - Composants React pour le Système de Design de l'État.](https://github.com/dataesr/react-dsfr)

## Seeds

Les seeds permettent de restaurer simplement des bases de données avec des données réalistes. C'est très utile en développement local ou bien sur les environnements de review apps ou de staging. On a fait le choix d'avoir ici des seeds déterministes et non aléatoires, pour pouvoir reproduire des environnements prévisibles.

`node scripts/generate-seeds.js` permet de générer certains fichiers CSV dans le répertoire prisma/seeds. Ce script s'appuie sur la gem [`faker.js`](https://github.com/Marak/faker.js) pour générer des éléments aléatoires en masse comme des noms et prénoms. Les stocker dans des CSV rend l'ingestion des seeds déterministes. Une autre partie des CSV a été créée manuellement à partir de données plus ou moins réelles.

`npx prisma db seed` restaure la base de données grace aux seeds. Il lit les fichiers CSV générés précedemment et exécute des requêtes d'insertion.
