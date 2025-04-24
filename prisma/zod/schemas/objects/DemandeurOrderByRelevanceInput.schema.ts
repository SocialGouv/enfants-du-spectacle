import { z } from 'zod';
import { DemandeurOrderByRelevanceFieldEnumSchema } from '../enums/DemandeurOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => DemandeurOrderByRelevanceFieldEnumSchema),
      z.lazy(() => DemandeurOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const DemandeurOrderByRelevanceInputObjectSchema = Schema;
