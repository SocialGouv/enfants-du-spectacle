import type {
  Commentaire,
  Commission,
  Demandeur,
  Dossier,
  Enfant,
  PieceDossier,
  SendList,
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
  medecin: User | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
  piecesDossier: PieceDossier[];
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

interface CommentaireNotifications {
  dossierId: number;
  notificationsProject: number;
  notificationsChildren: number;
  newPiecesEnfant: number;
  newPiecesDossier: number;
}

type CommissionData = Commission & { dossiers: DossierData[] };

type SendListData = SendList & { user: User };

type statusGroup = "futur" | "past";

interface linkPiece {
  id: number;
  type: string;
  statut: string | null;
  link: string | null;
  externalId?: string | null;
  nom?: string | null;
  dossierId?: number | null;
  enfantId?: number;
}

interface dossierlinks {
  id: number;
  piecesDossier: linkPiece[];
}

interface DataLinks {
  id: number;
  dossier: dossierlinks;
  enfants: Array<{
    id: number;
    piecesDossier: linkPiece[];
  }>;
  [key: string]: unknown;
}

interface Remuneration {
  id: number;
  typeRemuneration: string | null;
  natureCachet: string | null;
  autreNatureCachet: string | null;
  montant: number | null;
  nombre: number | null;
  nombreLignes: number | null;
  totalDadr: number | null;
  comment: string | null;
  enfantId: number | null;
}

export type {
  CommentaireData,
  CommentaireDataLight,
  CommentaireNotifications,
  CommissionData,
  DataLinks,
  DossierData,
  DossierDataLight,
  Remuneration,
  SendListData,
  statusGroup,
};
