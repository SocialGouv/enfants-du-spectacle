import { z } from 'zod';
import { SocieteProductionOrderByRelevanceFieldEnumSchema } from '../enums/SocieteProductionOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => SocieteProductionOrderByRelevanceFieldEnumSchema),
      z.lazy(() => SocieteProductionOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const SocieteProductionOrderByRelevanceInputObjectSchema = Schema;
