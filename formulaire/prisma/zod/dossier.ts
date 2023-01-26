import * as z from "zod"
import * as imports from "../null"
import { StatutDossier, CategorieDossier, JustificatifDossier } from "@prisma/client"
import { CompleteEnfant, RelatedEnfantModel, CompletePieceDossier, RelatedPieceDossierModel, CompleteUser, RelatedUserModel, CompleteDemandeur, RelatedDemandeurModel } from "./index"

export const DossierModel = z.object({
  id: z.number().int(),
  nom: z.string().nullish(),
  statut: z.nativeEnum(StatutDossier),
  categorie: z.nativeEnum(CategorieDossier).nullish(),
  userId: z.number().int(),
  justificatifs: z.nativeEnum(JustificatifDossier).array(),
  scenesSensibles: z.string().array(),
  presentation: z.string().nullish(),
  dateDebut: z.date().nullish(),
  dateFin: z.date().nullish(),
  number: z.number().int().nullish(),
  dateDerniereModification: z.date().nullish(),
  cdc: z.number().int().nullish(),
  scenario: z.string().nullish(),
  securite: z.string().nullish(),
  complementaire: z.string().nullish(),
  dateDepot: z.date().nullish(),
  demandeurId: z.number().int().nullish(),
})

export interface CompleteDossier extends z.infer<typeof DossierModel> {
  enfants: CompleteEnfant[]
  piecesDossier: CompletePieceDossier[]
  user: CompleteUser
  Demandeur?: CompleteDemandeur | null
}

/**
 * RelatedDossierModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDossierModel: z.ZodSchema<CompleteDossier> = z.lazy(() => DossierModel.extend({
  enfants: RelatedEnfantModel.array(),
  piecesDossier: RelatedPieceDossierModel.array(),
  user: RelatedUserModel,
  Demandeur: RelatedDemandeurModel.nullish(),
}))
