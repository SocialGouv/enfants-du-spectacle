import { z } from 'zod';
import { DossierOrderByRelevanceFieldEnumSchema } from '../enums/DossierOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => DossierOrderByRelevanceFieldEnumSchema),
      z.lazy(() => DossierOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const DossierOrderByRelevanceInputObjectSchema = Schema;
