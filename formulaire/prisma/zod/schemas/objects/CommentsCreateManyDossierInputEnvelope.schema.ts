import { z } from 'zod';
import { CommentsCreateManyDossierInputObjectSchema } from './CommentsCreateManyDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateManyDossierInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentsCreateManyDossierInputObjectSchema),
      z.lazy(() => CommentsCreateManyDossierInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentsCreateManyDossierInputEnvelopeObjectSchema = Schema;
