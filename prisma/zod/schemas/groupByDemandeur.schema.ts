import { z } from 'zod';
import { DemandeurWhereInputObjectSchema } from './objects/DemandeurWhereInput.schema';
import { DemandeurOrderByWithAggregationInputObjectSchema } from './objects/DemandeurOrderByWithAggregationInput.schema';
import { DemandeurScalarWhereWithAggregatesInputObjectSchema } from './objects/DemandeurScalarWhereWithAggregatesInput.schema';
import { DemandeurScalarFieldEnumSchema } from './enums/DemandeurScalarFieldEnum.schema';

export const DemandeurGroupBySchema = z.object({
  where: DemandeurWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      DemandeurOrderByWithAggregationInputObjectSchema,
      DemandeurOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: DemandeurScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(DemandeurScalarFieldEnumSchema),
});
