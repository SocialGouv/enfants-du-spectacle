import { z } from 'zod';
import { CommentsWhereInputObjectSchema } from './objects/CommentsWhereInput.schema';
import { CommentsOrderByWithAggregationInputObjectSchema } from './objects/CommentsOrderByWithAggregationInput.schema';
import { CommentsScalarWhereWithAggregatesInputObjectSchema } from './objects/CommentsScalarWhereWithAggregatesInput.schema';
import { CommentsScalarFieldEnumSchema } from './enums/CommentsScalarFieldEnum.schema';

export const CommentsGroupBySchema = z.object({
  where: CommentsWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CommentsOrderByWithAggregationInputObjectSchema,
      CommentsOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CommentsScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CommentsScalarFieldEnumSchema),
});
