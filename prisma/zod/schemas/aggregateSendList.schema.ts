import { z } from 'zod';
import { SendListOrderByWithRelationInputObjectSchema } from './objects/SendListOrderByWithRelationInput.schema';
import { SendListWhereInputObjectSchema } from './objects/SendListWhereInput.schema';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';
import { SendListCountAggregateInputObjectSchema } from './objects/SendListCountAggregateInput.schema';
import { SendListMinAggregateInputObjectSchema } from './objects/SendListMinAggregateInput.schema';
import { SendListMaxAggregateInputObjectSchema } from './objects/SendListMaxAggregateInput.schema';
import { SendListAvgAggregateInputObjectSchema } from './objects/SendListAvgAggregateInput.schema';
import { SendListSumAggregateInputObjectSchema } from './objects/SendListSumAggregateInput.schema';

export const SendListAggregateSchema = z.object({
  orderBy: z
    .union([
      SendListOrderByWithRelationInputObjectSchema,
      SendListOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SendListWhereInputObjectSchema.optional(),
  cursor: SendListWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), SendListCountAggregateInputObjectSchema])
    .optional(),
  _min: SendListMinAggregateInputObjectSchema.optional(),
  _max: SendListMaxAggregateInputObjectSchema.optional(),
  _avg: SendListAvgAggregateInputObjectSchema.optional(),
  _sum: SendListSumAggregateInputObjectSchema.optional(),
});
