import { PrismaClient } from "@prisma/client";
import parse from "csv-parse/lib/sync";
import faker from "faker";
import fs from "fs";
import slugify from "slugify";

const prisma = new PrismaClient();

const readCsv = (name: string) =>
  fs.readFileSync(`${__dirname}/seeds/${name}.csv`);

function randomItem<Type>(items: Type[]) {
  return items[Math.floor(Math.random() * items.length)];
}

async function main() {
  await prisma.enfant.deleteMany();
  await prisma.projet.deleteMany();
  await prisma.dossierDS.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.demandeur.deleteMany();
  await prisma.societeProduction.deleteMany();
  await prisma.commission.deleteMany();

  for (const agent of parse(readCsv("agents"), { columns: true })) {
    await prisma.agent.create({ data: agent });
  }

  for (const commission of parse(readCsv("commissions"), { columns: true })) {
    commission.date = new Date(commission.date as string);
    commission.dateLimiteDepot = new Date(commission.dateLimiteDepot as string);
    await prisma.commission.create({ data: commission });
  }

  for (const societeProduction of parse(readCsv("societes"), {
    columns: true,
  })) {
    await prisma.societeProduction.create({ data: societeProduction });
  }

  const enfantsSeeds = parse(readCsv("enfants"), { columns: true });
  enfantsSeeds.forEach((e: any) => (e.role = "role"));

  const commission = await prisma.commission.findFirst();
  const societeProductions = await prisma.societeProduction.findMany();
  if (!commission) throw Error();

  for await (const [i, y] of Array.from(Array(50)).entries()) {
    const societeProduction = randomItem(societeProductions);
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
      data: { demandeurId: demandeur.id, numero: 14001 + i },
    });
    await prisma.projet.create({
      data: {
        commissionId: commission.id,
        dossierDSNumero: dossierDS.numero,
        enfants: { create: enfantsSeeds.splice(0, 10) },
        nom: "Le non-film",
        societeProductionId: societeProduction.id,
      },
    });
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
