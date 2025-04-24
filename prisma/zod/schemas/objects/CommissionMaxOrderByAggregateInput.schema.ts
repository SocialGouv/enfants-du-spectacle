import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    departement: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    dateLimiteDepot: z.lazy(() => SortOrderSchema).optional(),
    lastSent: z.lazy(() => SortOrderSchema).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const CommissionMaxOrderByAggregateInputObjectSchema = Schema;
