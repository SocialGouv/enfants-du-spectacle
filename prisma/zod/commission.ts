import * as z from "zod"
import * as imports from "../null"
import { CompleteDossier, RelatedDossierModel, CompleteSendList, RelatedSendListModel } from "./index"

export const CommissionModel = z.object({
  id: z.number().int(),
  departement: z.string(),
  date: z.date(),
  dateLimiteDepot: z.date(),
  lastSent: z.date().nullish(),
})

export interface CompleteCommission extends z.infer<typeof CommissionModel> {
  dossiers: CompleteDossier[]
  SendList: CompleteSendList[]
}

/**
 * RelatedCommissionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommissionModel: z.ZodSchema<CompleteCommission> = z.lazy(() => CommissionModel.extend({
  dossiers: RelatedDossierModel.array(),
  SendList: RelatedSendListModel.array(),
}))
