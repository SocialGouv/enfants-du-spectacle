import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommissionOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './CommissionOrderByWithRelationAndSearchRelevanceInput.schema';
import { UserOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './UserOrderByWithRelationAndSearchRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      send: z.lazy(() => SortOrderSchema).optional(),
      lastSent: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      commissionId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      commission: z
        .lazy(
          () =>
            CommissionOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      user: z
        .lazy(() => UserOrderByWithRelationAndSearchRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const SendListOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;
