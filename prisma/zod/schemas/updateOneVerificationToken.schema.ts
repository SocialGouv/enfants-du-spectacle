import { z } from 'zod';
import { VerificationTokenUpdateInputObjectSchema } from './objects/VerificationTokenUpdateInput.schema';
import { VerificationTokenUncheckedUpdateInputObjectSchema } from './objects/VerificationTokenUncheckedUpdateInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';

export const VerificationTokenUpdateOneSchema = z.object({
  data: z.union([
    VerificationTokenUpdateInputObjectSchema,
    VerificationTokenUncheckedUpdateInputObjectSchema,
  ]),
  where: VerificationTokenWhereUniqueInputObjectSchema,
});
