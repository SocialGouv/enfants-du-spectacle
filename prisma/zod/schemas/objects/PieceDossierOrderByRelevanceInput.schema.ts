import { z } from 'zod';
import { PieceDossierOrderByRelevanceFieldEnumSchema } from '../enums/PieceDossierOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => PieceDossierOrderByRelevanceFieldEnumSchema),
      z.lazy(() => PieceDossierOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const PieceDossierOrderByRelevanceInputObjectSchema = Schema;
