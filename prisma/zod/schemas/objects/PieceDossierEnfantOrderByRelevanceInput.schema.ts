import { z } from 'zod';
import { PieceDossierEnfantOrderByRelevanceFieldEnumSchema } from '../enums/PieceDossierEnfantOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => PieceDossierEnfantOrderByRelevanceFieldEnumSchema),
      z.lazy(() => PieceDossierEnfantOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const PieceDossierEnfantOrderByRelevanceInputObjectSchema = Schema;
