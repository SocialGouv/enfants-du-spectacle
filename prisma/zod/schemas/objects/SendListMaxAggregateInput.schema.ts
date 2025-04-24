import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    send: z.literal(true).optional(),
    lastSent: z.literal(true).optional(),
    commissionId: z.literal(true).optional(),
    userId: z.literal(true).optional(),
  })
  .strict();

export const SendListMaxAggregateInputObjectSchema = Schema;
