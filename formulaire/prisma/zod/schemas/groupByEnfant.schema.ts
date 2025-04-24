import { z } from 'zod';
import { EnfantWhereInputObjectSchema } from './objects/EnfantWhereInput.schema';
import { EnfantOrderByWithAggregationInputObjectSchema } from './objects/EnfantOrderByWithAggregationInput.schema';
import { EnfantScalarWhereWithAggregatesInputObjectSchema } from './objects/EnfantScalarWhereWithAggregatesInput.schema';
import { EnfantScalarFieldEnumSchema } from './enums/EnfantScalarFieldEnum.schema';

export const EnfantGroupBySchema = z.object({
  where: EnfantWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      EnfantOrderByWithAggregationInputObjectSchema,
      EnfantOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: EnfantScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(EnfantScalarFieldEnumSchema),
});
