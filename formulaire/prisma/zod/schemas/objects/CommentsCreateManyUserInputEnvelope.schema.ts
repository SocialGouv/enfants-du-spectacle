import { z } from 'zod';
import { CommentsCreateManyUserInputObjectSchema } from './CommentsCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentsCreateManyUserInputObjectSchema),
      z.lazy(() => CommentsCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentsCreateManyUserInputEnvelopeObjectSchema = Schema;
