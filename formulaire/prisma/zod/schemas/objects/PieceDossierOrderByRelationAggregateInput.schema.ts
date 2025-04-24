import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PieceDossierOrderByRelationAggregateInputObjectSchema = Schema;
