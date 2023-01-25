import * as z from "zod"
import * as imports from "../null"
import { TypeEmploi, JustificatifEnfant } from "@prisma/client"
import { CompletePieceDossierEnfant, RelatedPieceDossierEnfantModel, CompleteDossier, RelatedDossierModel, CompleteUser, RelatedUserModel } from "./index"

export const EnfantModel = z.object({
  id: z.number().int(),
  prenom: z.string().nullish(),
  nom: z.string().nullish(),
  dateNaissance: z.date().nullish(),
  typeEmploi: z.nativeEnum(TypeEmploi).nullish(),
  nomPersonnage: z.string().nullish(),
  periodeTravail: z.string().nullish(),
  nombreJours: z.number().int().nullish(),
  contexteTravail: z.string().nullish(),
  montantCachet: z.number().nullish(),
  nombreCachets: z.number().int().nullish(),
  nombreLignes: z.number().int().nullish(),
  remunerationsAdditionnelles: z.string().nullish(),
  remunerationTotale: z.number().nullish(),
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
  livret: z.string().nullish(),
  autorisation: z.string().nullish(),
  situation: z.string().nullish(),
  contrat: z.string().nullish(),
  certificat: z.string().nullish(),
  avis: z.string().nullish(),
  dateDerniereModification: z.date().nullish(),
  userId: z.number().int().nullish(),
})

export interface CompleteEnfant extends z.infer<typeof EnfantModel> {
  piecesDossier: CompletePieceDossierEnfant[]
  dossier?: CompleteDossier | null
  populatedBy?: CompleteUser | null
}

/**
 * RelatedEnfantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEnfantModel: z.ZodSchema<CompleteEnfant> = z.lazy(() => EnfantModel.extend({
  piecesDossier: RelatedPieceDossierEnfantModel.array(),
  dossier: RelatedDossierModel.nullish(),
  populatedBy: RelatedUserModel.nullish(),
}))
