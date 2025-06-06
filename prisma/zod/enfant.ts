import * as z from "zod"
import { TypeEmploi, JustificatifEnfant, TypeConsultation, TypeConsultationMedecin } from "@prisma/client"
import { CompletePieceDossierEnfant, RelatedPieceDossierEnfantModel, CompleteDossier, RelatedDossierModel } from "./index"

// Type pour la compatibilité avec les données existantes
const numberOrString = z.union([z.number(), z.string()]).transform(val => 
  typeof val === 'string' ? Number(val) : val
);

export const EnfantModel = z.object({
  id: z.number().int(),
  prenom: z.string(),
  nom: z.string(),
  dateNaissance: z.date(),
  typeEmploi: z.nativeEnum(TypeEmploi),
  nomPersonnage: z.string().nullish(),
  periodeTravail: z.string().nullish(),
  nombreJours: numberOrString,
  contexteTravail: z.string().nullish(),
  montantCachet: numberOrString,
  nombreCachets: numberOrString.default(0),
  nombreLignes: numberOrString.default(0),
  remunerationsAdditionnelles: z.string().nullish(),
  remunerationTotale: numberOrString,
  justificatifs: z.nativeEnum(JustificatifEnfant).array(),
  dossierId: z.number().int(),
  cdc: z.number().int().nullish(),
  adresseEnfant: z.string().nullish(),
  nomRepresentant1: z.string().nullish(),
  prenomRepresentant1: z.string().nullish(),
  adresseRepresentant1: z.string().nullish(),
  telRepresentant1: z.string().nullish(),
  mailRepresentant1: z.string().nullish(),
  nomRepresentant2: z.string().nullish(),
  prenomRepresentant2: z.string().nullish(),
  adresseRepresentant2: z.string().nullish(),
  telRepresentant2: z.string().nullish(),
  mailRepresentant2: z.string().nullish(),
  externalId: z.string().nullish(),
  typeConsultation: z.nativeEnum(TypeConsultation).nullish(),
  typeConsultationMedecin: z.nativeEnum(TypeConsultationMedecin).nullish(),
  dateConsultation: z.date().nullish(),
  checkTravailNuit: z.boolean().nullish(),
  textTravailNuit: z.string().nullish(),
  piecesDossier: z.array(z.object({
    type: z.nativeEnum(JustificatifEnfant)
  })).optional(),
})

export interface CompleteEnfant extends z.infer<typeof EnfantModel> {
  piecesDossier: CompletePieceDossierEnfant[]
  dossier: CompleteDossier
}

/**
 * RelatedEnfantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEnfantModel: z.ZodSchema<CompleteEnfant> = z.lazy(() => EnfantModel.extend({
  piecesDossier: RelatedPieceDossierEnfantModel.array(),
  dossier: RelatedDossierModel,
}))
