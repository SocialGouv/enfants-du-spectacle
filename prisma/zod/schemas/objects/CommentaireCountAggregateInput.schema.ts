import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    text: z.literal(true).optional(),
    date: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
    seen: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const CommentaireCountAggregateInputObjectSchema = Schema;
