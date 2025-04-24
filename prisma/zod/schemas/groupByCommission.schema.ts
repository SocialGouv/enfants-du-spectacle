import { z } from 'zod';
import { CommissionWhereInputObjectSchema } from './objects/CommissionWhereInput.schema';
import { CommissionOrderByWithAggregationInputObjectSchema } from './objects/CommissionOrderByWithAggregationInput.schema';
import { CommissionScalarWhereWithAggregatesInputObjectSchema } from './objects/CommissionScalarWhereWithAggregatesInput.schema';
import { CommissionScalarFieldEnumSchema } from './enums/CommissionScalarFieldEnum.schema';

export const CommissionGroupBySchema = z.object({
  where: CommissionWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CommissionOrderByWithAggregationInputObjectSchema,
      CommissionOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CommissionScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CommissionScalarFieldEnumSchema),
});
