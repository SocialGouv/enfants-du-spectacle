import { z } from 'zod';
import { PieceDossierEnfantWhereInputObjectSchema } from './objects/PieceDossierEnfantWhereInput.schema';
import { PieceDossierEnfantOrderByWithAggregationInputObjectSchema } from './objects/PieceDossierEnfantOrderByWithAggregationInput.schema';
import { PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema } from './objects/PieceDossierEnfantScalarWhereWithAggregatesInput.schema';
import { PieceDossierEnfantScalarFieldEnumSchema } from './enums/PieceDossierEnfantScalarFieldEnum.schema';

export const PieceDossierEnfantGroupBySchema = z.object({
  where: PieceDossierEnfantWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PieceDossierEnfantOrderByWithAggregationInputObjectSchema,
      PieceDossierEnfantOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having:
    PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PieceDossierEnfantScalarFieldEnumSchema),
});
