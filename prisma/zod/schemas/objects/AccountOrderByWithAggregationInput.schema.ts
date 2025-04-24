import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AccountCountOrderByAggregateInputObjectSchema } from './AccountCountOrderByAggregateInput.schema';
import { AccountAvgOrderByAggregateInputObjectSchema } from './AccountAvgOrderByAggregateInput.schema';
import { AccountMaxOrderByAggregateInputObjectSchema } from './AccountMaxOrderByAggregateInput.schema';
import { AccountMinOrderByAggregateInputObjectSchema } from './AccountMinOrderByAggregateInput.schema';
import { AccountSumOrderByAggregateInputObjectSchema } from './AccountSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    provider: z.lazy(() => SortOrderSchema).optional(),
    providerAccountId: z.lazy(() => SortOrderSchema).optional(),
    refresh_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    access_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    expires_at: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    token_type: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    id_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    session_state: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    oauth_token_secret: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    oauth_token: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => AccountCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => AccountAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => AccountMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => AccountMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => AccountSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const AccountOrderByWithAggregationInputObjectSchema = Schema;
