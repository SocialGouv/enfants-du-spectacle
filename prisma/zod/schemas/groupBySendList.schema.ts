import { z } from 'zod';
import { SendListWhereInputObjectSchema } from './objects/SendListWhereInput.schema';
import { SendListOrderByWithAggregationInputObjectSchema } from './objects/SendListOrderByWithAggregationInput.schema';
import { SendListScalarWhereWithAggregatesInputObjectSchema } from './objects/SendListScalarWhereWithAggregatesInput.schema';
import { SendListScalarFieldEnumSchema } from './enums/SendListScalarFieldEnum.schema';

export const SendListGroupBySchema = z.object({
  where: SendListWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      SendListOrderByWithAggregationInputObjectSchema,
      SendListOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: SendListScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(SendListScalarFieldEnumSchema),
});
