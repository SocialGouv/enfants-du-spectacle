import { z } from 'zod';
import { VerificationTokenOrderByWithRelationInputObjectSchema } from './objects/VerificationTokenOrderByWithRelationInput.schema';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenScalarFieldEnumSchema } from './enums/VerificationTokenScalarFieldEnum.schema';

export const VerificationTokenFindFirstSchema = z.object({
  orderBy: z
    .union([
      VerificationTokenOrderByWithRelationInputObjectSchema,
      VerificationTokenOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: VerificationTokenWhereInputObjectSchema.optional(),
  cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(VerificationTokenScalarFieldEnumSchema).optional(),
});
