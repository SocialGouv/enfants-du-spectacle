import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { VerificationTokenOrderByRelevanceInputObjectSchema } from './VerificationTokenOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _relevance: z
        .lazy(() => VerificationTokenOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;
