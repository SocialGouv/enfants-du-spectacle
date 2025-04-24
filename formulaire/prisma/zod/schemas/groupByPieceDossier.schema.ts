import { z } from 'zod';
import { PieceDossierWhereInputObjectSchema } from './objects/PieceDossierWhereInput.schema';
import { PieceDossierOrderByWithAggregationInputObjectSchema } from './objects/PieceDossierOrderByWithAggregationInput.schema';
import { PieceDossierScalarWhereWithAggregatesInputObjectSchema } from './objects/PieceDossierScalarWhereWithAggregatesInput.schema';
import { PieceDossierScalarFieldEnumSchema } from './enums/PieceDossierScalarFieldEnum.schema';

export const PieceDossierGroupBySchema = z.object({
  where: PieceDossierWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PieceDossierOrderByWithAggregationInputObjectSchema,
      PieceDossierOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: PieceDossierScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PieceDossierScalarFieldEnumSchema),
});
