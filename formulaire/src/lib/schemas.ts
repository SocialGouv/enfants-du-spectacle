// Schémas Zod pour la validation des données
import { z } from 'zod';
import type { Role, JustificatifDossier, STATUT_PIECE, StatutDossier, CategorieDossier, JustificatifEnfant, TypeEmploi, TypeConsultation } from '@prisma/client';

// Types personnalisés pour la compatibilité
type StatusNotif = 'NOUVEAU' | 'MIS_A_JOUR' | 'PRET' | 'EN_COURS' | 'FAVORABLE' | 'FAVORABLE_SOUS_RESERVE' | 'AJOURNE' | 'REFUSE';
type Source = 'FORM_DS' | 'FORM_EDS' | 'MANUEL';
type TypeConsultationMedecin = 'EN_PRESENTIEL' | 'A_DISTANCE';

// Modèle Account
export const AccountModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable().optional(),
  access_token: z.string().nullable().optional(),
  expires_at: z.number().int().nullable().optional(),
  token_type: z.string().nullable().optional(),
  scope: z.string().nullable().optional(),
  id_token: z.string().nullable().optional(),
  session_state: z.string().nullable().optional(),
  oauth_token_secret: z.string().nullable().optional(),
  oauth_token: z.string().nullable().optional(),
});

// Modèle Commentaire
export const CommentaireModel = z.object({
  id: z.number().int(),
  text: z.string(),
  date: z.date(),
  userId: z.number().int(),
  dossierId: z.number().int(),
  seen: z.boolean().nullable().optional(),
});

// Modèle Commission
export const CommissionModel = z.object({
  id: z.number().int(),
  departement: z.string(),
  date: z.date(),
  dateLimiteDepot: z.date(),
  lastSent: z.date().nullable().optional(),
  archived: z.boolean().nullable().optional(),
});

// Modèle Demandeur
export const DemandeurModel = z.object({
  id: z.union([z.number().int(), z.string()]),
  email: z.string(),
  nom: z.string(),
  prenom: z.string(),
  phone: z.string().nullable().optional(),
  fonction: z.string(),
  societeProductionId: z.number().int(),
  conventionCollectiveCode: z.string().nullable().optional(),
  otherConventionCollective: z.string().nullable().optional(),
});

// Modèle Dossier avec piecesDossier pour la rétrocompatibilité
export const DossierModel = z.object({
  id: z.union([z.number().int(), z.string()]),
  nom: z.string(),
  statut: z.string() as z.ZodType<StatutDossier>,
  categorie: z.string() as z.ZodType<CategorieDossier>,
  commissionId: z.number().int(),
  societeProductionId: z.number().int(),
  numeroDS: z.number().int().nullable().optional(),
  userId: z.number().int().nullable().optional(),
  medecinId: z.number().int().nullable().optional(),
  demandeurId: z.number().int(),
  justificatifs: z.array(z.string() as z.ZodType<JustificatifDossier>),
  scenesSensibles: z.array(z.string()),
  presentation: z.string(),
  conventionCollectiveCode: z.string().nullable().optional(),
  otherConventionCollective: z.string().nullable().optional(),
  dateDebut: z.date(),
  dateFin: z.date(),
  externalId: z.string().nullable().optional(),
  number: z.number().int().nullable().optional(),
  dateDerniereModification: z.date().nullable().optional(),
  cdc: z.number().int().nullable().optional(),
  dateDepot: z.date().nullable().optional(),
  statusNotification: z.string().nullable().optional() as z.ZodType<StatusNotif | null | undefined>,
  source: z.string().nullable().optional() as z.ZodType<Source | null | undefined>,
  piecesDossier: z.array(z.object({
    type: z.string() as z.ZodType<JustificatifDossier>
  })).optional(),
});

// Modèle Enfant avec piecesDossier pour la rétrocompatibilité
export const EnfantModel = z.object({
  id: z.union([z.number().int(), z.string()]),
  prenom: z.string(),
  nom: z.string(),
  dateNaissance: z.date(),
  typeEmploi: z.string() as z.ZodType<TypeEmploi>,
  nomPersonnage: z.string().nullable().optional(),
  periodeTravail: z.string().nullable().optional(),
  nombreJours: z.union([z.number().int(), z.string()]),
  contexteTravail: z.string().nullable().optional(),
  montantCachet: z.union([z.number(), z.string()]),
  nombreCachets: z.union([z.number().int(), z.string()]).default(0),
  nombreLignes: z.union([z.number().int(), z.string()]).default(0),
  remunerationsAdditionnelles: z.string().nullable().optional(),
  remunerationTotale: z.union([z.number(), z.string()]),
  justificatifs: z.array(z.string() as z.ZodType<JustificatifEnfant>),
  dossierId: z.number().int(),
  cdc: z.number().int().nullable().optional(),
  adresseEnfant: z.string().nullable().optional(),
  nomRepresentant1: z.string().nullable().optional(),
  prenomRepresentant1: z.string().nullable().optional(),
  adresseRepresentant1: z.string().nullable().optional(),
  telRepresentant1: z.string().nullable().optional(),
  mailRepresentant1: z.string().nullable().optional(),
  adresseRepresentant2: z.string().nullable().optional(),
  nomRepresentant2: z.string().nullable().optional(),
  prenomRepresentant2: z.string().nullable().optional(),
  telRepresentant2: z.string().nullable().optional(),
  mailRepresentant2: z.string().nullable().optional(),
  externalId: z.string().nullable().optional(),
  typeConsultation: z.string().nullable().optional() as z.ZodType<TypeConsultation | null | undefined>,
  typeConsultationMedecin: z.string().nullable().optional() as z.ZodType<TypeConsultationMedecin | null | undefined>,
  dateConsultation: z.date().nullable().optional(),
  checkTravailNuit: z.boolean().nullable().optional(),
  textTravailNuit: z.string().nullable().optional(),
  piecesDossier: z.array(z.object({
    type: z.string() as z.ZodType<JustificatifEnfant>
  })).optional(),
});

// Modèle PieceDossier
export const PieceDossierModel = z.object({
  id: z.number().int(),
  dossierId: z.number().int(),
  externalId: z.string().nullable().optional(),
  type: z.string() as z.ZodType<JustificatifDossier>,
  link: z.string(),
  statut: z.string().nullable().optional() as z.ZodType<STATUT_PIECE | null | undefined>,
});

// Modèle PieceDossierEnfant
export const PieceDossierEnfantModel = z.object({
  id: z.number().int(),
  enfantId: z.number().int(),
  dossierId: z.number().int().nullable().optional(),
  externalId: z.string().nullable().optional(),
  type: z.string() as z.ZodType<JustificatifEnfant>,
  link: z.string(),
  statut: z.string().nullable().optional() as z.ZodType<STATUT_PIECE | null | undefined>,
});

// Modèle SendList
export const SendListModel = z.object({
  id: z.number().int(),
  send: z.boolean(),
  lastSent: z.date().nullable().optional(),
  commissionId: z.number().int(),
  userId: z.number().int(),
});

// Modèle Session
export const SessionModel = z.object({
  id: z.number().int(),
  sessionToken: z.string(),
  userId: z.number().int(),
  expires: z.date(),
});

// Modèle SocieteProduction
export const SocieteProductionModel = z.object({
  id: z.union([z.number().int(), z.string()]),
  nom: z.string(),
  siret: z.string(),
  siren: z.string(),
  departement: z.string(),
  naf: z.string(),
  raisonSociale: z.string(),
  adresse: z.string(),
  adresseCodePostal: z.string(),
  adresseCodeCommune: z.string(),
  formeJuridique: z.string(),
  conventionCollectiveCode: z.string(),
  otherConventionCollective: z.string().nullable().optional(),
});

// Modèle User
export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullable().optional(),
  nom: z.string().nullable().optional(),
  prenom: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  role: z.string().nullable().optional() as z.ZodType<Role | null | undefined>,
  departement: z.string().nullable().optional(),
  departements: z.array(z.string()),
});

// Modèle VerificationToken
export const VerificationTokenModel = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

// Valeurs pour la rétrocompatibilité - permettent l'inférence de type
export const RelatedDossierModel = DossierModel;
export const RelatedEnfantModel = EnfantModel;
