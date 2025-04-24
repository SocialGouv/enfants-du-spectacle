import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommentaireCountOrderByAggregateInputObjectSchema } from './CommentaireCountOrderByAggregateInput.schema';
import { CommentaireAvgOrderByAggregateInputObjectSchema } from './CommentaireAvgOrderByAggregateInput.schema';
import { CommentaireMaxOrderByAggregateInputObjectSchema } from './CommentaireMaxOrderByAggregateInput.schema';
import { CommentaireMinOrderByAggregateInputObjectSchema } from './CommentaireMinOrderByAggregateInput.schema';
import { CommentaireSumOrderByAggregateInputObjectSchema } from './CommentaireSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    seen: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => CommentaireCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CommentaireAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CommentaireMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CommentaireMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CommentaireSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentaireOrderByWithAggregationInputObjectSchema = Schema;
