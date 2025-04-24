import { z } from 'zod';
import { SocieteProductionOrderByWithRelationInputObjectSchema } from './objects/SocieteProductionOrderByWithRelationInput.schema';
import { SocieteProductionWhereInputObjectSchema } from './objects/SocieteProductionWhereInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionCountAggregateInputObjectSchema } from './objects/SocieteProductionCountAggregateInput.schema';
import { SocieteProductionMinAggregateInputObjectSchema } from './objects/SocieteProductionMinAggregateInput.schema';
import { SocieteProductionMaxAggregateInputObjectSchema } from './objects/SocieteProductionMaxAggregateInput.schema';
import { SocieteProductionAvgAggregateInputObjectSchema } from './objects/SocieteProductionAvgAggregateInput.schema';
import { SocieteProductionSumAggregateInputObjectSchema } from './objects/SocieteProductionSumAggregateInput.schema';

export const SocieteProductionAggregateSchema = z.object({
  orderBy: z
    .union([
      SocieteProductionOrderByWithRelationInputObjectSchema,
      SocieteProductionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SocieteProductionWhereInputObjectSchema.optional(),
  cursor: SocieteProductionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), SocieteProductionCountAggregateInputObjectSchema])
    .optional(),
  _min: SocieteProductionMinAggregateInputObjectSchema.optional(),
  _max: SocieteProductionMaxAggregateInputObjectSchema.optional(),
  _avg: SocieteProductionAvgAggregateInputObjectSchema.optional(),
  _sum: SocieteProductionSumAggregateInputObjectSchema.optional(),
});
