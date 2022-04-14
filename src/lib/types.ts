import type {
  Commentaire,
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
  commentaires: Commentaire[];
  demandeur: Demandeur;
  _count?: {
    enfants: number;
  } | null;
};

type CommentaireData = Commentaire & {
  user?: User | null;
  dossier?: Dossier | null;
};

interface CommentaireDataLight {
  userId: number;
  text: string;
  date: Date;
  dossierId: number;
}

type CommissionData = Commission & { dossiers: DossierData[] };

export type {
  CommentaireData,
  CommentaireDataLight,
  CommissionData,
  DossierData,
  DossierDataLight,
};
