import * as z from "zod"
import * as imports from "../null"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteDossier, RelatedDossierModel, CompleteEnfant, RelatedEnfantModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  nom: z.string().nullish(),
  prenom: z.string().nullish(),
  email: z.string().nullish(),
  telephone: z.string().nullish(),
  fonction: z.string().nullish(),
  emailVerified: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role).nullish(),
  departement: z.string().nullish(),
  departements: z.string().array(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Account: CompleteAccount[]
  Session: CompleteSession[]
  dossiers: CompleteDossier[]
  Enfant: CompleteEnfant[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Account: RelatedAccountModel.array(),
  Session: RelatedSessionModel.array(),
  dossiers: RelatedDossierModel.array(),
  Enfant: RelatedEnfantModel.array(),
}))
