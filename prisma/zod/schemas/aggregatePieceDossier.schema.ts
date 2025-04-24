import { z } from 'zod';
import { PieceDossierOrderByWithRelationInputObjectSchema } from './objects/PieceDossierOrderByWithRelationInput.schema';
import { PieceDossierWhereInputObjectSchema } from './objects/PieceDossierWhereInput.schema';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';
import { PieceDossierCountAggregateInputObjectSchema } from './objects/PieceDossierCountAggregateInput.schema';
import { PieceDossierMinAggregateInputObjectSchema } from './objects/PieceDossierMinAggregateInput.schema';
import { PieceDossierMaxAggregateInputObjectSchema } from './objects/PieceDossierMaxAggregateInput.schema';
import { PieceDossierAvgAggregateInputObjectSchema } from './objects/PieceDossierAvgAggregateInput.schema';
import { PieceDossierSumAggregateInputObjectSchema } from './objects/PieceDossierSumAggregateInput.schema';

export const PieceDossierAggregateSchema = z.object({
  orderBy: z
    .union([
      PieceDossierOrderByWithRelationInputObjectSchema,
      PieceDossierOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PieceDossierWhereInputObjectSchema.optional(),
  cursor: PieceDossierWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PieceDossierCountAggregateInputObjectSchema])
    .optional(),
  _min: PieceDossierMinAggregateInputObjectSchema.optional(),
  _max: PieceDossierMaxAggregateInputObjectSchema.optional(),
  _avg: PieceDossierAvgAggregateInputObjectSchema.optional(),
  _sum: PieceDossierSumAggregateInputObjectSchema.optional(),
});
