import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    send: z.lazy(() => SortOrderSchema).optional(),
    lastSent: z.lazy(() => SortOrderSchema).optional(),
    commissionId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SendListMinOrderByAggregateInputObjectSchema = Schema;
