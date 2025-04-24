import { z } from 'zod';
import { PieceDossierEnfantOrderByWithRelationInputObjectSchema } from './objects/PieceDossierEnfantOrderByWithRelationInput.schema';
import { PieceDossierEnfantWhereInputObjectSchema } from './objects/PieceDossierEnfantWhereInput.schema';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantCountAggregateInputObjectSchema } from './objects/PieceDossierEnfantCountAggregateInput.schema';
import { PieceDossierEnfantMinAggregateInputObjectSchema } from './objects/PieceDossierEnfantMinAggregateInput.schema';
import { PieceDossierEnfantMaxAggregateInputObjectSchema } from './objects/PieceDossierEnfantMaxAggregateInput.schema';
import { PieceDossierEnfantAvgAggregateInputObjectSchema } from './objects/PieceDossierEnfantAvgAggregateInput.schema';
import { PieceDossierEnfantSumAggregateInputObjectSchema } from './objects/PieceDossierEnfantSumAggregateInput.schema';

export const PieceDossierEnfantAggregateSchema = z.object({
  orderBy: z
    .union([
      PieceDossierEnfantOrderByWithRelationInputObjectSchema,
      PieceDossierEnfantOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PieceDossierEnfantWhereInputObjectSchema.optional(),
  cursor: PieceDossierEnfantWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PieceDossierEnfantCountAggregateInputObjectSchema])
    .optional(),
  _min: PieceDossierEnfantMinAggregateInputObjectSchema.optional(),
  _max: PieceDossierEnfantMaxAggregateInputObjectSchema.optional(),
  _avg: PieceDossierEnfantAvgAggregateInputObjectSchema.optional(),
  _sum: PieceDossierEnfantSumAggregateInputObjectSchema.optional(),
});
