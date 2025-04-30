import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteDossier, RelatedDossierModel } from "./index"

export const CommentaireModel = z.object({
  id: z.number().int(),
  text: z.string(),
  date: z.date(),
  userId: z.number().int(),
  dossierId: z.number().int(),
  seen: z.boolean().nullish(),
})

export interface CompleteCommentaire extends z.infer<typeof CommentaireModel> {
  user?: CompleteUser | null
  dossier?: CompleteDossier | null
}

/**
 * RelatedCommentaireModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentaireModel: z.ZodSchema<CompleteCommentaire> = z.lazy(() => CommentaireModel.extend({
  user: RelatedUserModel.nullish(),
  dossier: RelatedDossierModel.nullish(),
}))
