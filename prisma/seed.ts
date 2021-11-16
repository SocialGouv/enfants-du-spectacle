import type { Commission, Prisma, StatutProjet, User } from "@prisma/client";
import { CategorieProjet, PrismaClient } from "@prisma/client";
import parse from "csv-parse/lib/sync";
import faker from "faker";
import fs from "fs";
import slugify from "slugify";

faker.seed(2021); // to get reproducible results

const NOMBRE_PROJETS = [12, 13, 5, 10, 23, 4, 12, 17, 23, 12, 20, 16];
const projetsCount = NOMBRE_PROJETS.reduce((i, y) => i + y, 0);
const NUMEROS_DOSSIERS_DS: number[] = Array.from(Array(projetsCount)).map(
  (i, y) => 14000 + y
);

const prisma = new PrismaClient();
interface UserCSV {
  email: string;
  nom: string;
  prenom: string;
}
interface CommissionCSV {
  departement: string;
  date: Date;
  dateLimiteDepot: Date;
}
interface SocieteCSV {
  nom: string;
  departement: string;
  siret: string;
}
interface EnfantCSV {
  prenom: string;
  nom: string;
  role: string;
}
interface ProjetCSV {
  nom: string;
  nombreEnfants: number;
}

function readCsv<Type>(name: string): Type[] {
  return parse(fs.readFileSync(`${__dirname}/seeds/${name}.csv`), {
    columns: true,
  }) as Type[];
}

function getRandomUser(users: User[], inThePast: boolean): User | null {
  const values = inThePast ? users : (users as (User | null)[]).concat([null]);
  return faker.random.arrayElement(values);
}

function getRandomStatut(inThePast: boolean): StatutProjet {
  const values = inThePast
    ? [
      "AVIS_AJOURNE",
      "AVIS_FAVORABLE",
      "AVIS_FAVORABLE_SOUS_RESERVE",
      "AVIS_DEFAVORABLE",
      "ACCEPTE",
      "REFUSE",
    ]
    : ["CONSTRUCTION", "INSTRUCTION", "PRET"];
  return faker.random.arrayElement(values) as StatutProjet;
}

function getRandomCategorie(): CategorieProjet {
  return faker.random.objectElement(CategorieProjet, "value");
}

async function main() {
  await prisma.enfant.deleteMany();
  await prisma.projet.deleteMany();
  await prisma.dossierDS.deleteMany();
  await prisma.user.deleteMany();
  await prisma.demandeur.deleteMany();
  await prisma.societeProduction.deleteMany();
  await prisma.commission.deleteMany();

  const users = await Promise.all(
    readCsv<UserCSV>("users").map(async (user) =>
      prisma.user.create({ data: user })
    )
  );

  for (const filename of ["commissions-2021", "commissions-2022"]) {
    for (const commission of readCsv<CommissionCSV>(filename)) {
      await prisma.commission.create({
        data: {
          date: new Date(commission.date),
          dateLimiteDepot: new Date(commission.dateLimiteDepot),
          departement: commission.departement,
        },
      });
    }
  }

  for (const societeProduction of readCsv<SocieteCSV>("societes")) {
    await prisma.societeProduction.create({ data: societeProduction });
  }

  const enfantsSeeds = readCsv<EnfantCSV>("enfants");
  enfantsSeeds.forEach((e) => (e.role = "role"));

  const projetsSeeds = readCsv<ProjetCSV>("projets");

  for (const commission of await prisma.commission.findMany({
    take: NOMBRE_PROJETS.length,
  })) {
    const inThePast = commission.date < new Date();
    const societesProductions = await prisma.societeProduction.findMany();
    for await (const _y of Array.from(
      Array(NOMBRE_PROJETS.shift())
    ).entries()) {
      const societeProduction = faker.random.arrayElement(societesProductions);
      const nom = faker.name.firstName();
      const prenom = faker.name.firstName();
      const email = faker.internet.email(
        prenom,
        nom,
        `${slugify(societeProduction.nom, { lower: true })}.fr`
      );
      const demandeur = await prisma.demandeur.create({
        data: { email, nom, prenom, societeProductionId: societeProduction.id },
      });
      const dossierDS = await prisma.dossierDS.create({
        data: {
          demandeurId: demandeur.id,
          numero: NUMEROS_DOSSIERS_DS.shift() ?? 0,
        },
      });
      const projet = projetsSeeds.shift();
      if (!projet) throw Error("no more projets");
      const data: Prisma.ProjetUncheckedCreateInput = {
        categorie: getRandomCategorie(),
        commissionId: commission.id,
        dossierDSNumero: dossierDS.numero,
        enfants: { create: enfantsSeeds.splice(0, projet.nombreEnfants) },
        nom: projet.nom,
        societeProductionId: societeProduction.id,
        statut: getRandomStatut(inThePast),
        userId: getRandomUser(users, inThePast)?.id,
      };
      await prisma.projet.create({ data });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
