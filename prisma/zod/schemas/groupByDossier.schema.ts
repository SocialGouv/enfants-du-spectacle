import { z } from 'zod';
import { DossierWhereInputObjectSchema } from './objects/DossierWhereInput.schema';
import { DossierOrderByWithAggregationInputObjectSchema } from './objects/DossierOrderByWithAggregationInput.schema';
import { DossierScalarWhereWithAggregatesInputObjectSchema } from './objects/DossierScalarWhereWithAggregatesInput.schema';
import { DossierScalarFieldEnumSchema } from './enums/DossierScalarFieldEnum.schema';

export const DossierGroupBySchema = z.object({
  where: DossierWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      DossierOrderByWithAggregationInputObjectSchema,
      DossierOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: DossierScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(DossierScalarFieldEnumSchema),
});
