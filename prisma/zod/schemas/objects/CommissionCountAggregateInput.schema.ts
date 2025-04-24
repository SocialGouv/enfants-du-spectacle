import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    departement: z.literal(true).optional(),
    date: z.literal(true).optional(),
    dateLimiteDepot: z.literal(true).optional(),
    lastSent: z.literal(true).optional(),
    archived: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const CommissionCountAggregateInputObjectSchema = Schema;
