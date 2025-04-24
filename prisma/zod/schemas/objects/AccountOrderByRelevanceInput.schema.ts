import { z } from 'zod';
import { AccountOrderByRelevanceFieldEnumSchema } from '../enums/AccountOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => AccountOrderByRelevanceFieldEnumSchema),
      z.lazy(() => AccountOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const AccountOrderByRelevanceInputObjectSchema = Schema;
