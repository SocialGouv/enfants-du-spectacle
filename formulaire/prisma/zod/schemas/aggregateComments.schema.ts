import { z } from 'zod';
import { CommentsOrderByWithRelationInputObjectSchema } from './objects/CommentsOrderByWithRelationInput.schema';
import { CommentsWhereInputObjectSchema } from './objects/CommentsWhereInput.schema';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';
import { CommentsCountAggregateInputObjectSchema } from './objects/CommentsCountAggregateInput.schema';
import { CommentsMinAggregateInputObjectSchema } from './objects/CommentsMinAggregateInput.schema';
import { CommentsMaxAggregateInputObjectSchema } from './objects/CommentsMaxAggregateInput.schema';
import { CommentsAvgAggregateInputObjectSchema } from './objects/CommentsAvgAggregateInput.schema';
import { CommentsSumAggregateInputObjectSchema } from './objects/CommentsSumAggregateInput.schema';

export const CommentsAggregateSchema = z.object({
  orderBy: z
    .union([
      CommentsOrderByWithRelationInputObjectSchema,
      CommentsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CommentsWhereInputObjectSchema.optional(),
  cursor: CommentsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CommentsCountAggregateInputObjectSchema])
    .optional(),
  _min: CommentsMinAggregateInputObjectSchema.optional(),
  _max: CommentsMaxAggregateInputObjectSchema.optional(),
  _avg: CommentsAvgAggregateInputObjectSchema.optional(),
  _sum: CommentsSumAggregateInputObjectSchema.optional(),
});
