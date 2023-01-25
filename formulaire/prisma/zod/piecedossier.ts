import * as z from "zod"
import * as imports from "../null"
import { JustificatifDossier } from "@prisma/client"
import { CompleteDossier, RelatedDossierModel } from "./index"

export const PieceDossierModel = z.object({
  id: z.number().int(),
  nom: z.string(),
  dossierId: z.number().int(),
  externalId: z.string().nullish(),
  type: z.nativeEnum(JustificatifDossier),
  link: z.string().nullish(),
})

export interface CompletePieceDossier extends z.infer<typeof PieceDossierModel> {
  dossier?: CompleteDossier | null
}

/**
 * RelatedPieceDossierModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPieceDossierModel: z.ZodSchema<CompletePieceDossier> = z.lazy(() => PieceDossierModel.extend({
  dossier: RelatedDossierModel.nullish(),
}))
