import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    enfantId: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
  })
  .strict();

export const PieceDossierEnfantSumAggregateInputObjectSchema = Schema;
