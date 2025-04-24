import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nombreJours: z.lazy(() => SortOrderSchema).optional(),
    montantCachet: z.lazy(() => SortOrderSchema).optional(),
    nombreCachets: z.lazy(() => SortOrderSchema).optional(),
    nombreLignes: z.lazy(() => SortOrderSchema).optional(),
    remunerationTotale: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    cdc: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const EnfantAvgOrderByAggregateInputObjectSchema = Schema;
