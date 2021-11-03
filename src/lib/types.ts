import type {
  Commission,
  Enfant,
  Projet,
  SocieteProduction,
  User,
} from ".prisma/client";

type ProjetDataLight = Projet & {
  user: User | null;
  societeProduction: SocieteProduction;
  _count: {
    enfants: number;
  } | null;
};

type ProjetData = Projet & {
  user: User | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
};

export type { ProjetData, ProjetDataLight };
