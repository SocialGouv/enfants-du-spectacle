import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    seen: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const CommentaireMaxOrderByAggregateInputObjectSchema = Schema;
