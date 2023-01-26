import * as z from "zod"
import * as imports from "../null"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteDossier, RelatedDossierModel, CompleteCommentaire, RelatedCommentaireModel, CompleteSendList, RelatedSendListModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  nom: z.string().nullish(),
  prenom: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  role: z.nativeEnum(Role).nullish(),
  departement: z.string().nullish(),
  departements: z.string().array(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  dossiers: CompleteDossier[]
  commentaires: CompleteCommentaire[]
  SendList: CompleteSendList[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  dossiers: RelatedDossierModel.array(),
  commentaires: RelatedCommentaireModel.array(),
  SendList: RelatedSendListModel.array(),
}))
