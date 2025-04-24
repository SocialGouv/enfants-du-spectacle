import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionSumAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
  })
  .strict();

export const SessionSumAggregateInputObjectSchema = Schema;
