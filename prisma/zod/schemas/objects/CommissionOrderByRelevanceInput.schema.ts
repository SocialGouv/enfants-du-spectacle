import { z } from 'zod';
import { CommissionOrderByRelevanceFieldEnumSchema } from '../enums/CommissionOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => CommissionOrderByRelevanceFieldEnumSchema),
      z.lazy(() => CommissionOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const CommissionOrderByRelevanceInputObjectSchema = Schema;
