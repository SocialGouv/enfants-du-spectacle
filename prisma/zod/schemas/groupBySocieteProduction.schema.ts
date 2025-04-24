import { z } from 'zod';
import { SocieteProductionWhereInputObjectSchema } from './objects/SocieteProductionWhereInput.schema';
import { SocieteProductionOrderByWithAggregationInputObjectSchema } from './objects/SocieteProductionOrderByWithAggregationInput.schema';
import { SocieteProductionScalarWhereWithAggregatesInputObjectSchema } from './objects/SocieteProductionScalarWhereWithAggregatesInput.schema';
import { SocieteProductionScalarFieldEnumSchema } from './enums/SocieteProductionScalarFieldEnum.schema';

export const SocieteProductionGroupBySchema = z.object({
  where: SocieteProductionWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      SocieteProductionOrderByWithAggregationInputObjectSchema,
      SocieteProductionOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having:
    SocieteProductionScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(SocieteProductionScalarFieldEnumSchema),
});
