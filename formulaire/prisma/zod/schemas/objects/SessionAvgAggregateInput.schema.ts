import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionAvgAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
  })
  .strict();

export const SessionAvgAggregateInputObjectSchema = Schema;
