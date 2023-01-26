import * as z from "zod"
import * as imports from "../null"
import { TypeEmploi, JustificatifEnfant } from "@prisma/client"
import { CompletePieceDossierEnfant, RelatedPieceDossierEnfantModel, CompleteDossier, RelatedDossierModel } from "./index"

export const EnfantModel = z.object({
  id: z.number().int(),
  prenom: z.string(),
  nom: z.string(),
  dateNaissance: z.string(),
  typeEmploi: z.nativeEnum(TypeEmploi),
  nomPersonnage: z.string().nullish(),
  periodeTravail: z.string().nullish(),
  nombreJours: z.number().int(),
  contexteTravail: z.string().nullish(),
  montantCachet: z.number(),
  nombreCachets: z.number().int(),
  nombreLignes: z.number().int(),
  remunerationsAdditionnelles: z.string().nullish(),
  remunerationTotale: z.number(),
  justificatifs: z.nativeEnum(JustificatifEnfant).array(),
  dossierId: z.number().int(),
  cdc: z.number().int().nullish(),
  adresseEnfant: z.string().nullish(),
  nomRepresentant1: z.string().nullish(),
  prenomRepresentant1: z.string().nullish(),
  adresseRepresentant1: z.string().nullish(),
  adresseRepresentant2: z.string().nullish(),
  nomRepresentant2: z.string().nullish(),
  prenomRepresentant2: z.string().nullish(),
  externalId: z.string().nullish(),
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
