import { z } from 'zod';
import { CommissionOrderByWithRelationInputObjectSchema } from './objects/CommissionOrderByWithRelationInput.schema';
import { CommissionWhereInputObjectSchema } from './objects/CommissionWhereInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';
import { CommissionScalarFieldEnumSchema } from './enums/CommissionScalarFieldEnum.schema';

export const CommissionFindManySchema = z.object({
  orderBy: z
    .union([
      CommissionOrderByWithRelationInputObjectSchema,
      CommissionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CommissionWhereInputObjectSchema.optional(),
  cursor: CommissionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CommissionScalarFieldEnumSchema).optional(),
});
