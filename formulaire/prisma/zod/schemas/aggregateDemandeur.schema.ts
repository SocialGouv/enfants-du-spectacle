import { z } from 'zod';
import { DemandeurOrderByWithRelationInputObjectSchema } from './objects/DemandeurOrderByWithRelationInput.schema';
import { DemandeurWhereInputObjectSchema } from './objects/DemandeurWhereInput.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';
import { DemandeurCountAggregateInputObjectSchema } from './objects/DemandeurCountAggregateInput.schema';
import { DemandeurMinAggregateInputObjectSchema } from './objects/DemandeurMinAggregateInput.schema';
import { DemandeurMaxAggregateInputObjectSchema } from './objects/DemandeurMaxAggregateInput.schema';
import { DemandeurAvgAggregateInputObjectSchema } from './objects/DemandeurAvgAggregateInput.schema';
import { DemandeurSumAggregateInputObjectSchema } from './objects/DemandeurSumAggregateInput.schema';

export const DemandeurAggregateSchema = z.object({
  orderBy: z
    .union([
      DemandeurOrderByWithRelationInputObjectSchema,
      DemandeurOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DemandeurWhereInputObjectSchema.optional(),
  cursor: DemandeurWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), DemandeurCountAggregateInputObjectSchema])
    .optional(),
  _min: DemandeurMinAggregateInputObjectSchema.optional(),
  _max: DemandeurMaxAggregateInputObjectSchema.optional(),
  _avg: DemandeurAvgAggregateInputObjectSchema.optional(),
  _sum: DemandeurSumAggregateInputObjectSchema.optional(),
});
