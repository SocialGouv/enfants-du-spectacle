import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    commissionId: z.literal(true).optional(),
    userId: z.literal(true).optional(),
  })
  .strict();

export const SendListSumAggregateInputObjectSchema = Schema;
