import { z } from 'zod';
import { DossierOrderByWithRelationInputObjectSchema } from './objects/DossierOrderByWithRelationInput.schema';
import { DossierWhereInputObjectSchema } from './objects/DossierWhereInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';
import { DossierCountAggregateInputObjectSchema } from './objects/DossierCountAggregateInput.schema';
import { DossierMinAggregateInputObjectSchema } from './objects/DossierMinAggregateInput.schema';
import { DossierMaxAggregateInputObjectSchema } from './objects/DossierMaxAggregateInput.schema';
import { DossierAvgAggregateInputObjectSchema } from './objects/DossierAvgAggregateInput.schema';
import { DossierSumAggregateInputObjectSchema } from './objects/DossierSumAggregateInput.schema';

export const DossierAggregateSchema = z.object({
  orderBy: z
    .union([
      DossierOrderByWithRelationInputObjectSchema,
      DossierOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DossierWhereInputObjectSchema.optional(),
  cursor: DossierWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), DossierCountAggregateInputObjectSchema])
    .optional(),
  _min: DossierMinAggregateInputObjectSchema.optional(),
  _max: DossierMaxAggregateInputObjectSchema.optional(),
  _avg: DossierAvgAggregateInputObjectSchema.optional(),
  _sum: DossierSumAggregateInputObjectSchema.optional(),
});
