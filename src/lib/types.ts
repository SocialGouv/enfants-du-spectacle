import type {
  Commission,
  Demandeur,
  Dossier,
  Enfant,
  SocieteProduction,
  User,
} from "@prisma/client";

type DossierDataLight = Dossier & {
  user: User | null;
  societeProduction: SocieteProduction;
  _count: {
    enfants: number;
  } | null;
};

type DossierData = Dossier & {
  user: User | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
  demandeur: Demandeur;
};

type CommissionData = Commission & { dossiers: DossierDataLight[] };

export type { CommissionData, DossierData, DossierDataLight };
