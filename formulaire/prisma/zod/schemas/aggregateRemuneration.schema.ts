import { z } from 'zod';
import { RemunerationOrderByWithRelationInputObjectSchema } from './objects/RemunerationOrderByWithRelationInput.schema';
import { RemunerationWhereInputObjectSchema } from './objects/RemunerationWhereInput.schema';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';
import { RemunerationCountAggregateInputObjectSchema } from './objects/RemunerationCountAggregateInput.schema';
import { RemunerationMinAggregateInputObjectSchema } from './objects/RemunerationMinAggregateInput.schema';
import { RemunerationMaxAggregateInputObjectSchema } from './objects/RemunerationMaxAggregateInput.schema';
import { RemunerationAvgAggregateInputObjectSchema } from './objects/RemunerationAvgAggregateInput.schema';
import { RemunerationSumAggregateInputObjectSchema } from './objects/RemunerationSumAggregateInput.schema';

export const RemunerationAggregateSchema = z.object({
  orderBy: z
    .union([
      RemunerationOrderByWithRelationInputObjectSchema,
      RemunerationOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RemunerationWhereInputObjectSchema.optional(),
  cursor: RemunerationWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), RemunerationCountAggregateInputObjectSchema])
    .optional(),
  _min: RemunerationMinAggregateInputObjectSchema.optional(),
  _max: RemunerationMaxAggregateInputObjectSchema.optional(),
  _avg: RemunerationAvgAggregateInputObjectSchema.optional(),
  _sum: RemunerationSumAggregateInputObjectSchema.optional(),
});
