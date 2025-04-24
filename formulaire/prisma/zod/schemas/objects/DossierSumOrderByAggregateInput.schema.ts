import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    collaboratorIds: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    number: z.lazy(() => SortOrderSchema).optional(),
    cdc: z.lazy(() => SortOrderSchema).optional(),
    demandeurId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DossierSumOrderByAggregateInputObjectSchema = Schema;
