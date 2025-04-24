import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommentsCountOrderByAggregateInputObjectSchema } from './CommentsCountOrderByAggregateInput.schema';
import { CommentsAvgOrderByAggregateInputObjectSchema } from './CommentsAvgOrderByAggregateInput.schema';
import { CommentsMaxOrderByAggregateInputObjectSchema } from './CommentsMaxOrderByAggregateInput.schema';
import { CommentsMinOrderByAggregateInputObjectSchema } from './CommentsMinOrderByAggregateInput.schema';
import { CommentsSumOrderByAggregateInputObjectSchema } from './CommentsSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commentsId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    externalUserId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    sender: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    seen: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    date: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => CommentsCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => CommentsAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => CommentsMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => CommentsMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => CommentsSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const CommentsOrderByWithAggregationInputObjectSchema = Schema;
