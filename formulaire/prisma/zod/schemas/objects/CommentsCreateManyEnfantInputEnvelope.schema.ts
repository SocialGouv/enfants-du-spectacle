import { z } from 'zod';
import { CommentsCreateManyEnfantInputObjectSchema } from './CommentsCreateManyEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateManyEnfantInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentsCreateManyEnfantInputObjectSchema),
      z.lazy(() => CommentsCreateManyEnfantInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentsCreateManyEnfantInputEnvelopeObjectSchema = Schema;
