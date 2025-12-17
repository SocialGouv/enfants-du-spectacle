# Enfants du Spectacle

> Simplifier les demandes d’autorisation d’emplois d’enfants du spectacle pour garantir leur protection

Ce service numérique public est porté par la DRIEETS d’Île-de-France. Il fait partie du programme [beta.gouv.fr](https://beta.gouv.fr) et est développé au sein de [la Fabrique Numérique des Ministères Sociaux](https://fabrique.social.gouv.fr).

![lint workflow](https://github.com/SocialGouv/enfants-du-spectacle/actions/workflows/lint.yml/badge.svg)
![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-yellow.svg)

# Développement

Stack:
- [NextJS](https://www.nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Prisma](https://www.prisma.io/docs)
- [@dataesr/react-dsfr - Composants React pour le Système de Design de l'État.](https://github.com/dataesr/react-dsfr)

## 🔒 Gestionnaire de paquets

**Ce projet utilise pnpm pour des raisons de sécurité et de performance.**

⚠️ **N'utilisez pas npm ou yarn** - utilisez exclusivement pnpm pour gérer les dépendances.

```bash
# ✅ Correct
pnpm install
pnpm dev

# ❌ Incorrect - Ne pas utiliser
npm install   # ❌
yarn install  # ❌
```

Pour plus de détails sur la migration, consultez [MIGRATION_PNPM.md](./MIGRATION_PNPM.md).

## Local environment

- `pnpm install`

puis:

- installer [overmind](https://github.com/DarthSim/overmind)
- `pnpm run dev-procfile`

- ou alors: `pnpm dev & npx maildev`

Une interface web est disponible sur [localhost:1080](http://localhost:1080/) qui affiche tous les mails intercéptés.

## Seeds

Les seeds permettent de restaurer simplement des bases de données avec des données réalistes. C'est très utile en développement local ou bien sur les environnements de review apps ou de staging. On a fait le choix d'avoir ici des seeds déterministes et non aléatoires, pour pouvoir reproduire des environnements prévisibles.

Des CSV ont été créés manuellement dans `prisma/seeds/` à partir de données plus ou moins réelles pour les noms de films et de sociétés de productions.

`npx prisma@^6 db seed` restaure la base de données grace aux seeds. Ce script tronque entièrement la base, lit les fichiers CSVs et insère de nouvelles lignes.

Des scripts permettent de dumper et restaurer la db dans `src/scripts` au format pg_dump. Ce dump est versionné et restauré par les review apps. Cela permet de contourner l'absence des dépendences de développement sur ces environnements : `npx prisma@^6 db seed` ne peut en effet pas être lancé.

## Mails

Les templates de mails sont écrits en [MJML](https://mjml.io/) et doivent être convertis en HTML en cas de modification :

```sh
npx mjml src/mails/signin.mjml -o src/mails/signin.html
```
