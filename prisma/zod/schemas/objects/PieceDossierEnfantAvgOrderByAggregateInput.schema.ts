import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PieceDossierEnfantAvgOrderByAggregateInputObjectSchema = Schema;
