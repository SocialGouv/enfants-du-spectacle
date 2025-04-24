// Export de modèles Zod depuis les schémas générés
import { z } from 'zod';

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
  id: z.number().int(),
  email: z.string(),
  nom: z.string(),
  prenom: z.string(),
  phone: z.string().nullable().optional(),
  fonction: z.string(),
  societeProductionId: z.number().int(),
  conventionCollectiveCode: z.string().nullable().optional(),
  otherConventionCollective: z.string().nullable().optional(),
});

// Modèle Dossier
export const DossierModel = z.object({
  id: z.number().int(),
  nom: z.string(),
  statut: z.enum(['CONSTRUCTION', 'INSTRUCTION', 'PRET', 'AVIS_AJOURNE', 'AVIS_FAVORABLE', 'AVIS_FAVORABLE_SOUS_RESERVE', 'AVIS_DEFAVORABLE', 'ACCEPTE', 'REFUSE']),
  categorie: z.enum(['LONG_METRAGE', 'COURT_METRAGE', 'TELEFILM', 'SERIE', 'EMISSION_TV', 'DOCUMENTAIRE_FICTIONNEL', 'CLIP', 'THEATRE', 'DOUBLAGE', 'MUSIQUE_STUDIO', 'COMEDIE_MUSICALE', 'CONCERT', 'OPERA', 'BALLET', 'DANSE', 'CIRQUE', 'RADIO', 'PHOTO', 'FILM_INSTITUTIONNEL', 'JEU_VIDEO', 'VIDEO_EN_LIGNE', 'AUTRE']),
  commissionId: z.number().int(),
  societeProductionId: z.number().int(),
  numeroDS: z.number().int().nullable().optional(),
  userId: z.number().int().nullable().optional(),
  medecinId: z.number().int().nullable().optional(),
  demandeurId: z.number().int(),
  justificatifs: z.array(z.enum(['SYNOPSIS', 'SCENARIO', 'MESURES_SECURITE', 'PLAN_TRAVAIL', 'INFOS_COMPLEMENTAIRES'])),
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
  statusNotification: z.enum(['NOUVEAU', 'MIS_A_JOUR']).nullable().optional(),
  source: z.enum(['FORM_DS', 'FORM_EDS']).nullable().optional(),
});

// Modèle Enfant
export const EnfantModel = z.object({
  id: z.number().int(),
  prenom: z.string(),
  nom: z.string(),
  dateNaissance: z.date(),
  typeEmploi: z.enum(['ROLE_1', 'ROLE_2', 'FIGURATION', 'SILHOUETTE', 'SILHOUETTE_PARLANTE', 'DOUBLURE', 'DOUBLAGE', 'CHANT', 'CHORISTE', 'CIRCASSIEN', 'MUSICIEN', 'DANSE', 'JEU_VIDEO', 'AUTRE']),
  nomPersonnage: z.string().nullable().optional(),
  periodeTravail: z.string().nullable().optional(),
  nombreJours: z.number().int(),
  contexteTravail: z.string().nullable().optional(),
  montantCachet: z.number(),
  nombreCachets: z.number().int().default(0),
  nombreLignes: z.number().int().default(0),
  remunerationsAdditionnelles: z.string().nullable().optional(),
  remunerationTotale: z.number(),
  justificatifs: z.array(z.enum(['LIVRET_FAMILLE', 'AUTORISATION_PARENTALE', 'SITUATION_PARTICULIERE', 'CONTRAT', 'CERTIFICAT_SCOLARITE', 'AVIS_MEDICAL', 'DECLARATION_HONNEUR', 'BON_PRISE_EN_CHARGE', 'AUTORISATION_PRISE_EN_CHARGE'])),
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
  typeConsultation: z.enum(['THALIE', 'GENERALISTE', 'UNNEEDED']).nullable().optional(),
  typeConsultationMedecin: z.enum(['PHYSIQUE', 'PIECE', 'PRISE_EN_CHARGE', 'MEDECIN_TRAITANT']).nullable().optional(),
  dateConsultation: z.date().nullable().optional(),
  checkTravailNuit: z.boolean().nullable().optional(),
  textTravailNuit: z.string().nullable().optional(),
});

// Modèle PieceDossier
export const PieceDossierModel = z.object({
  id: z.number().int(),
  dossierId: z.number().int(),
  externalId: z.string().nullable().optional(),
  type: z.enum(['SYNOPSIS', 'SCENARIO', 'MESURES_SECURITE', 'PLAN_TRAVAIL', 'INFOS_COMPLEMENTAIRES']),
  link: z.string(),
  statut: z.enum(['VALIDE', 'REFUSE', 'EN_ATTENTE']).nullable().optional(),
});

// Modèle PieceDossierEnfant
export const PieceDossierEnfantModel = z.object({
  id: z.number().int(),
  enfantId: z.number().int(),
  dossierId: z.number().int().nullable().optional(),
  externalId: z.string().nullable().optional(),
  type: z.enum(['LIVRET_FAMILLE', 'AUTORISATION_PARENTALE', 'SITUATION_PARTICULIERE', 'CONTRAT', 'CERTIFICAT_SCOLARITE', 'AVIS_MEDICAL', 'DECLARATION_HONNEUR', 'BON_PRISE_EN_CHARGE', 'AUTORISATION_PRISE_EN_CHARGE']),
  link: z.string(),
  statut: z.enum(['VALIDE', 'REFUSE', 'EN_ATTENTE']).nullable().optional(),
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
  id: z.number().int(),
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
  role: z.enum(['ADMIN', 'INSTRUCTEUR', 'MEMBRE', 'MEDECIN']).nullable().optional(),
  departement: z.string().nullable().optional(),
  departements: z.array(z.string()),
});

// Modèle VerificationToken
export const VerificationTokenModel = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});
