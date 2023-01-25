import * as z from "zod"
import * as imports from "../null"
import { JustificatifEnfant } from "@prisma/client"
import { CompleteEnfant, RelatedEnfantModel } from "./index"

export const PieceDossierEnfantModel = z.object({
  id: z.number().int(),
  enfantId: z.number().int(),
  dossierId: z.number().int().nullish(),
  externalId: z.string().nullish(),
  type: z.nativeEnum(JustificatifEnfant),
  link: z.string(),
})

export interface CompletePieceDossierEnfant extends z.infer<typeof PieceDossierEnfantModel> {
  enfant?: CompleteEnfant | null
}

/**
 * RelatedPieceDossierEnfantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPieceDossierEnfantModel: z.ZodSchema<CompletePieceDossierEnfant> = z.lazy(() => PieceDossierEnfantModel.extend({
  enfant: RelatedEnfantModel.nullish(),
}))
