import { z } from 'zod';
import { VerificationTokenOrderByRelevanceFieldEnumSchema } from '../enums/VerificationTokenOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VerificationTokenOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => VerificationTokenOrderByRelevanceFieldEnumSchema),
      z.lazy(() => VerificationTokenOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict();

export const VerificationTokenOrderByRelevanceInputObjectSchema = Schema;
