import { z } from 'zod';
import { EnfantOrderByRelevanceFieldEnumSchema } from '../enums/EnfantOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => EnfantOrderByRelevanceFieldEnumSchema),
      z.lazy(() => EnfantOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const EnfantOrderByRelevanceInputObjectSchema = Schema;
