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
  statut: string;
  link: string;
}

interface dossierlinks {
  id: number;
  piecesDossier: linkPiece[];
}

interface DataLinks {
  id: number;
  dossier: dossierlinks;
  enfants: dossierlinks[];
}

export type {
  CommentaireData,
  CommentaireDataLight,
  CommentaireNotifications,
  CommissionData,
  DataLinks,
  DossierData,
  DossierDataLight,
  SendListData,
  statusGroup,
};
