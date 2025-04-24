import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
  })
  .strict();

export const CommentaireAvgAggregateInputObjectSchema = Schema;
