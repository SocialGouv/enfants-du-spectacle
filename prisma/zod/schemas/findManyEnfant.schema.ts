import { z } from 'zod';
import { EnfantOrderByWithRelationInputObjectSchema } from './objects/EnfantOrderByWithRelationInput.schema';
import { EnfantWhereInputObjectSchema } from './objects/EnfantWhereInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';
import { EnfantScalarFieldEnumSchema } from './enums/EnfantScalarFieldEnum.schema';

export const EnfantFindManySchema = z.object({
  orderBy: z
    .union([
      EnfantOrderByWithRelationInputObjectSchema,
      EnfantOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: EnfantWhereInputObjectSchema.optional(),
  cursor: EnfantWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(EnfantScalarFieldEnumSchema).optional(),
});
