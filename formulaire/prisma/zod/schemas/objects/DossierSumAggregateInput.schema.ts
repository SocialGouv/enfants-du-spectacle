import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    collaboratorIds: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    number: z.literal(true).optional(),
    cdc: z.literal(true).optional(),
    demandeurId: z.literal(true).optional(),
  })
  .strict();

export const DossierSumAggregateInputObjectSchema = Schema;
