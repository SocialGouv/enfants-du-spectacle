import { z } from 'zod';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenCreateInputObjectSchema } from './objects/VerificationTokenCreateInput.schema';
import { VerificationTokenUncheckedCreateInputObjectSchema } from './objects/VerificationTokenUncheckedCreateInput.schema';
import { VerificationTokenUpdateInputObjectSchema } from './objects/VerificationTokenUpdateInput.schema';
import { VerificationTokenUncheckedUpdateInputObjectSchema } from './objects/VerificationTokenUncheckedUpdateInput.schema';

export const VerificationTokenUpsertSchema = z.object({
  where: VerificationTokenWhereUniqueInputObjectSchema,
  create: z.union([
    VerificationTokenCreateInputObjectSchema,
    VerificationTokenUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    VerificationTokenUpdateInputObjectSchema,
    VerificationTokenUncheckedUpdateInputObjectSchema,
  ]),
});
