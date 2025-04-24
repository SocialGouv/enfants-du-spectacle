import { z } from 'zod';
import { EnfantOrderByWithRelationInputObjectSchema } from './objects/EnfantOrderByWithRelationInput.schema';
import { EnfantWhereInputObjectSchema } from './objects/EnfantWhereInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';
import { EnfantCountAggregateInputObjectSchema } from './objects/EnfantCountAggregateInput.schema';
import { EnfantMinAggregateInputObjectSchema } from './objects/EnfantMinAggregateInput.schema';
import { EnfantMaxAggregateInputObjectSchema } from './objects/EnfantMaxAggregateInput.schema';
import { EnfantAvgAggregateInputObjectSchema } from './objects/EnfantAvgAggregateInput.schema';
import { EnfantSumAggregateInputObjectSchema } from './objects/EnfantSumAggregateInput.schema';

export const EnfantAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), EnfantCountAggregateInputObjectSchema])
    .optional(),
  _min: EnfantMinAggregateInputObjectSchema.optional(),
  _max: EnfantMaxAggregateInputObjectSchema.optional(),
  _avg: EnfantAvgAggregateInputObjectSchema.optional(),
  _sum: EnfantSumAggregateInputObjectSchema.optional(),
});
