import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    societeProductionId: z.literal(true).optional(),
  })
  .strict();

export const DemandeurSumAggregateInputObjectSchema = Schema;
