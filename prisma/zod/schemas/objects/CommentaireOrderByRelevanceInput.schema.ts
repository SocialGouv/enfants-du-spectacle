import { z } from 'zod';
import { CommentaireOrderByRelevanceFieldEnumSchema } from '../enums/CommentaireOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => CommentaireOrderByRelevanceFieldEnumSchema),
      z.lazy(() => CommentaireOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const CommentaireOrderByRelevanceInputObjectSchema = Schema;
