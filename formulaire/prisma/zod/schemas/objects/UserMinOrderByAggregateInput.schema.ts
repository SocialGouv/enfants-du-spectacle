import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    prenom: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    telephone: z.lazy(() => SortOrderSchema).optional(),
    fonction: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    departement: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMinOrderByAggregateInputObjectSchema = Schema;
