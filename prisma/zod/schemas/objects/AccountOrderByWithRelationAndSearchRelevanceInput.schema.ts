import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './UserOrderByWithRelationAndSearchRelevanceInput.schema';
import { AccountOrderByRelevanceInputObjectSchema } from './AccountOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountOrderByWithRelationAndSearchRelevanceInput> =
  z
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
      user: z
        .lazy(() => UserOrderByWithRelationAndSearchRelevanceInputObjectSchema)
        .optional(),
      _relevance: z
        .lazy(() => AccountOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const AccountOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;
