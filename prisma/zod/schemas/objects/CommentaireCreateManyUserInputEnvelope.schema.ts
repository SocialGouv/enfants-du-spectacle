import { z } from 'zod';
import { CommentaireCreateManyUserInputObjectSchema } from './CommentaireCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentaireCreateManyUserInputObjectSchema),
      z.lazy(() => CommentaireCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentaireCreateManyUserInputEnvelopeObjectSchema = Schema;
