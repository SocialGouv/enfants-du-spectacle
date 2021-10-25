import type { Agent, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import parse from "csv-parse/lib/sync";
import faker from "faker";
import fs from "fs";
import slugify from "slugify";

const prisma = new PrismaClient();
interface AgentCSV {
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
  agentEmail: string;
}

function readCsv<Type>(name: string): Type[] {
  return parse(fs.readFileSync(`${__dirname}/seeds/${name}.csv`), {
    columns: true,
  }) as Type[];
}

function randomItem<Type>(items: Type[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function getAgentByEmail(agents: Agent[], email: string): Agent {
  const agent = agents.find((a) => a.email === email);
  if (!agent) throw Error("not found");
  return agent;
}

async function main() {
  await prisma.enfant.deleteMany();
  await prisma.projet.deleteMany();
  await prisma.dossierDS.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.demandeur.deleteMany();
  await prisma.societeProduction.deleteMany();
  await prisma.commission.deleteMany();

  const agents = await Promise.all(
    readCsv<AgentCSV>("agents").map(async (agent) =>
      prisma.agent.create({ data: agent })
    )
  );

  for (const commission of readCsv<CommissionCSV>("commissions")) {
    await prisma.commission.create({
      data: {
        date: new Date(commission.date),
        dateLimiteDepot: new Date(commission.dateLimiteDepot),
        departement: commission.departement,
      },
    });
  }

  for (const societeProduction of readCsv<SocieteCSV>("societes")) {
    await prisma.societeProduction.create({ data: societeProduction });
  }

  const enfantsSeeds = readCsv<EnfantCSV>("enfants");
  enfantsSeeds.forEach((e) => (e.role = "role"));

  const projetsSeeds = readCsv<ProjetCSV>("projets");

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
    const projet = projetsSeeds.shift();
    if (!projet) throw Error("no more projets");
    const data: Prisma.ProjetUncheckedCreateInput = {
      commissionId: commission.id,
      dossierDSNumero: dossierDS.numero,
      enfants: { create: enfantsSeeds.splice(0, projet.nombreEnfants) },
      nom: projet.nom,
      societeProductionId: societeProduction.id,
    };
    if (projet.agentEmail) {
      data.agentId = getAgentByEmail(agents, projet.agentEmail).id;
    }
    await prisma.projet.create({ data });
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
