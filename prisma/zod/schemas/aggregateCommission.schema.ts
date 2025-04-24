import { z } from 'zod';
import { CommissionOrderByWithRelationInputObjectSchema } from './objects/CommissionOrderByWithRelationInput.schema';
import { CommissionWhereInputObjectSchema } from './objects/CommissionWhereInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';
import { CommissionCountAggregateInputObjectSchema } from './objects/CommissionCountAggregateInput.schema';
import { CommissionMinAggregateInputObjectSchema } from './objects/CommissionMinAggregateInput.schema';
import { CommissionMaxAggregateInputObjectSchema } from './objects/CommissionMaxAggregateInput.schema';
import { CommissionAvgAggregateInputObjectSchema } from './objects/CommissionAvgAggregateInput.schema';
import { CommissionSumAggregateInputObjectSchema } from './objects/CommissionSumAggregateInput.schema';

export const CommissionAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), CommissionCountAggregateInputObjectSchema])
    .optional(),
  _min: CommissionMinAggregateInputObjectSchema.optional(),
  _max: CommissionMaxAggregateInputObjectSchema.optional(),
  _avg: CommissionAvgAggregateInputObjectSchema.optional(),
  _sum: CommissionSumAggregateInputObjectSchema.optional(),
});
