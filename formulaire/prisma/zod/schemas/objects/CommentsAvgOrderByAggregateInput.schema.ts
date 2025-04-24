import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z.lazy(() => SortOrderSchema).optional(),
    commentsId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    externalUserId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const CommentsAvgOrderByAggregateInputObjectSchema = Schema;
