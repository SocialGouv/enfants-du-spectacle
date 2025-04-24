import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
  })
  .strict();

export const SocieteProductionAvgAggregateInputObjectSchema = Schema;
