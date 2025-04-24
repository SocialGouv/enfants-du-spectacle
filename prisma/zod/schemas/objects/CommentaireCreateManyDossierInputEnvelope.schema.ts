import { z } from 'zod';
import { CommentaireCreateManyDossierInputObjectSchema } from './CommentaireCreateManyDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateManyDossierInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentaireCreateManyDossierInputObjectSchema),
      z.lazy(() => CommentaireCreateManyDossierInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentaireCreateManyDossierInputEnvelopeObjectSchema = Schema;
