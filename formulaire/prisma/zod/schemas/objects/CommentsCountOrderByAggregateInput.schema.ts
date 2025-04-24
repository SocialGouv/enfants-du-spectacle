import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z.lazy(() => SortOrderSchema).optional(),
    commentsId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    externalUserId: z.lazy(() => SortOrderSchema).optional(),
    sender: z.lazy(() => SortOrderSchema).optional(),
    seen: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const CommentsCountOrderByAggregateInputObjectSchema = Schema;
