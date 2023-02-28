import type {
  JustificatifDossier,
  JustificatifEnfant,
  Prisma,
  StatutDossier,
  TypeEmploi,
  User,
} from "@prisma/client";
import { CategorieDossier, PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";
import dateAdd from "date-fns/add";
import faker from "faker";
import fs from "fs";
import slugify from "slugify";

faker.locale = "fr";
faker.seed(2021); // to get reproducible results

const NOMBRE_DOSSIERS = [12, 13, 5, 10, 23, 4, 12, 17, 23, 12, 20, 16];
const dossiersCount = NOMBRE_DOSSIERS.reduce((i, y) => i + y, 0);
const NUMEROS_DOSSIERS_DS: number[] = Array.from(Array(dossiersCount)).map(
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
  siren: string;
  raisonSociale: string;
  adresse: string;
  adresseCodeCommune: string;
  adresseCodePostal: string;
  formeJuridique: string;
  naf: string;
  conventionCollectiveCode: string;
}
interface DossierCSV {
  nom: string;
  nombreEnfants: number;
}

const presentations = fs
  .readFileSync(`${__dirname}/seeds/presentations.txt`)
  .toString()
  .split("---")
  .map((p) => p.trim());

function readCsv<Type>(name: string): Type[] {
  return parse(fs.readFileSync(`${__dirname}/seeds/${name}.csv`), {
    columns: true,
  }) as Type[];
}

function getRandomUser(users: User[], inThePast: boolean): User | null {
  const values = inThePast ? users : (users as (User | null)[]).concat([null]);
  return faker.random.arrayElement(values);
}

function getRandomStatut(inThePast: boolean): StatutDossier {
  const pastValues = [
    "AVIS_AJOURNE",
    "AVIS_FAVORABLE",
    "AVIS_FAVORABLE_SOUS_RESERVE",
    "AVIS_DEFAVORABLE",
    "ACCEPTE",
    "REFUSE",
  ];
  const values = inThePast
    ? pastValues
    : ["CONSTRUCTION", "INSTRUCTION", "PRET"];
  return faker.random.arrayElement(values) as StatutDossier;
}

function getRandomJustificatifsDossier(): JustificatifDossier[] {
  const requiredJustificatifs = ["SCENARIO"];
  const optionalJustificatifs = [
    "SYNOPSIS",
    "MESURES_SECURITE",
    "PLAN_TRAVAIL",
    "INFOS_COMPLEMENTAIRES",
  ];
  return requiredJustificatifs.concat(
    faker.random.arrayElements(
      optionalJustificatifs,
      faker.datatype.number({ max: optionalJustificatifs.length, min: 0 })
    )
  ) as JustificatifDossier[];
}

function getRandomCategorie(): CategorieDossier {
  return faker.random.objectElement(CategorieDossier, "value");
}

const TYPES_EMPLOI: TypeEmploi[] = [
  "ROLE_1",
  "ROLE_2",
  "FIGURATION",
  "SILHOUETTE",
  "SILHOUETTE_PARLANTE",
  "DOUBLURE",
  "DOUBLAGE",
  "CHANT",
  "DANSE",
  "JEU_VIDEO",
  "AUTRE",
];

function getRandomJustificatifsEnfant(): JustificatifEnfant[] {
  const requiredJustificatifs = ["CONTRAT"];
  const optionalJustificatifs = [
    "LIVRET_FAMILLE",
    "AUTORISATION_PARENTALE",
    "SITUATION_PARTICULIERE",
    "CONTRAT",
    "CERTIFICAT_SCOLARITE",
    "AVIS_MEDICAL",
    "DECLARATION_HONNEUR",
  ];
  return requiredJustificatifs.concat(
    faker.random.arrayElements(
      optionalJustificatifs,
      faker.datatype.number({ max: optionalJustificatifs.length, min: 0 })
    )
  ) as JustificatifEnfant[];
}

function getRandomDemandeurFonction(): string {
  return faker.random.arrayElement([
    "Chargée de production",
    "Directrice",
    "Assistant de production",
    "Stagiaire",
    "Associée",
  ]);
}

function getRandomEnfant(): Omit<
  Prisma.EnfantUncheckedCreateInput,
  "dossierId"
> {
  return {
    dateNaissance: faker.date.between(
      new Date(2008, 1, 1),
      new Date(2017, 1, 1)
    ),
    justificatifs: getRandomJustificatifsEnfant(),
    montantCachet: faker.datatype.float({ max: 590, min: 90 }),
    nom: faker.name.lastName(),
    nombreCachets: faker.datatype.number({ max: 50, min: 1 }),
    nombreJours: faker.datatype.number({ max: 30, min: 1 }),
    prenom: faker.name.firstName(),
    remunerationTotale: faker.datatype.float({ max: 200, min: 5000 }),
    typeEmploi: faker.random.arrayElement(TYPES_EMPLOI),
    // contexteTravail String?
    // nomPersonnage String?
    // periodeTravail String?
    // remunerationsAdditionnelles String?
  };
}

function getRandomEnfants(): Omit<
  Prisma.EnfantUncheckedCreateInput,
  "dossierId"
>[] {
  return Array.from(Array(faker.datatype.number({ max: 35, min: 1 }))).map(
    getRandomEnfant
  );
}

const SCENES_SENSIBLES = [
  "Bagarres",
  "Nudité / Actes sexuels",
  "Violence psychologique ou physique",
  "Animaux",
  "Eau",
  "Feu",
  "Cascades",
  "Hauteur",
  "Machines dangereuses, produits chimiques ou agents biologiques",
];

function getRandomScenesSensibles(): string[] {
  return faker.random.arrayElements(
    SCENES_SENSIBLES,
    faker.datatype.number({ max: 2, min: 0 })
  );
}

async function main() {
  await prisma.enfant.deleteMany();
  await prisma.dossier.deleteMany();
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

  const dossiersSeeds = readCsv<DossierCSV>("dossiers");

  for (const commission of await prisma.commission.findMany({
    take: NOMBRE_DOSSIERS.length,
  })) {
    const inThePast = commission.date < new Date();
    const societesProductions = await prisma.societeProduction.findMany();
    for await (const _y of Array.from(
      Array(NOMBRE_DOSSIERS.shift())
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
        data: {
          email,
          fonction: getRandomDemandeurFonction(),
          nom,
          phone: faker.phone.phoneNumber("+336########"),
          prenom,
          societeProductionId: societeProduction.id,
        },
      });
      const dossier = dossiersSeeds.shift();
      if (!dossier) throw Error("no more dossiers");
      const dateDebut = faker.date.between(
        dateAdd(commission.date, { months: 1 }),
        dateAdd(commission.date, { months: 3 })
      );
      const dateFin = faker.date.between(
        dateAdd(dateDebut, { days: 10 }),
        dateAdd(dateDebut, { months: 2 })
      );
      const data: Prisma.DossierUncheckedCreateInput = {
        categorie: getRandomCategorie(),
        commissionId: commission.id,
        dateDebut,
        dateFin,
        demandeurId: demandeur.id,
        enfants: { create: getRandomEnfants() },
        justificatifs: getRandomJustificatifsDossier(),
        nom: dossier.nom,
        numeroDS: NUMEROS_DOSSIERS_DS.shift() ?? 0,
        presentation: faker.random.arrayElement(presentations),
        scenesSensibles: getRandomScenesSensibles(),
        societeProductionId: societeProduction.id,
        statut: getRandomStatut(inThePast),
        userId: getRandomUser(users, inThePast)?.id,
      };
      await prisma.dossier.create({ data });
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
