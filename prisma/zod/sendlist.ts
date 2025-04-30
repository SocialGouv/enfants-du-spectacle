import * as z from "zod"
import { CompleteCommission, RelatedCommissionModel, CompleteUser, RelatedUserModel } from "./index"

export const SendListModel = z.object({
  id: z.number().int(),
  send: z.boolean(),
  lastSent: z.date().nullish(),
  commissionId: z.number().int(),
  userId: z.number().int(),
})

export interface CompleteSendList extends z.infer<typeof SendListModel> {
  commission: CompleteCommission
  user: CompleteUser
}

/**
 * RelatedSendListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSendListModel: z.ZodSchema<CompleteSendList> = z.lazy(() => SendListModel.extend({
  commission: RelatedCommissionModel,
  user: RelatedUserModel,
}))
