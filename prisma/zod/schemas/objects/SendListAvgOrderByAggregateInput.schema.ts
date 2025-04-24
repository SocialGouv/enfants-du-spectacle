import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    commissionId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SendListAvgOrderByAggregateInputObjectSchema = Schema;
