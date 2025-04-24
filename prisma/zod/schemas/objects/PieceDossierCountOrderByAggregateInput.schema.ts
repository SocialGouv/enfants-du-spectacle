import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    link: z.lazy(() => SortOrderSchema).optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PieceDossierCountOrderByAggregateInputObjectSchema = Schema;
