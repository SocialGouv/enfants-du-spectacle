import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    societeProductionId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DemandeurAvgOrderByAggregateInputObjectSchema = Schema;
