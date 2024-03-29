import * as z from "zod"
import * as imports from "../null"

export const VerificationTokenModel = z.object({
  id: z.number().int(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
})
