import { z } from 'zod';
import { RemunerationWhereInputObjectSchema } from './objects/RemunerationWhereInput.schema';
import { RemunerationOrderByWithAggregationInputObjectSchema } from './objects/RemunerationOrderByWithAggregationInput.schema';
import { RemunerationScalarWhereWithAggregatesInputObjectSchema } from './objects/RemunerationScalarWhereWithAggregatesInput.schema';
import { RemunerationScalarFieldEnumSchema } from './enums/RemunerationScalarFieldEnum.schema';

export const RemunerationGroupBySchema = z.object({
  where: RemunerationWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      RemunerationOrderByWithAggregationInputObjectSchema,
      RemunerationOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: RemunerationScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(RemunerationScalarFieldEnumSchema),
});
