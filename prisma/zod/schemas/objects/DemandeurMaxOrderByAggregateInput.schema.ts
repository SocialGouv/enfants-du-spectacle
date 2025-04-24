import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    prenom: z.lazy(() => SortOrderSchema).optional(),
    phone: z.lazy(() => SortOrderSchema).optional(),
    fonction: z.lazy(() => SortOrderSchema).optional(),
    societeProductionId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DemandeurMaxOrderByAggregateInputObjectSchema = Schema;
