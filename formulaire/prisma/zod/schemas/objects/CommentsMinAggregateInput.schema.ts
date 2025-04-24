import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    text: z.literal(true).optional(),
    source: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
    enfantId: z.literal(true).optional(),
    commentsId: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    externalUserId: z.literal(true).optional(),
    sender: z.literal(true).optional(),
    seen: z.literal(true).optional(),
    date: z.literal(true).optional(),
  })
  .strict();

export const CommentsMinAggregateInputObjectSchema = Schema;
