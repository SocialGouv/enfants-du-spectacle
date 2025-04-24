import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    montant: z.lazy(() => SortOrderSchema).optional(),
    nombre: z.lazy(() => SortOrderSchema).optional(),
    nombreLignes: z.lazy(() => SortOrderSchema).optional(),
    totalDadr: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const RemunerationSumOrderByAggregateInputObjectSchema = Schema;
