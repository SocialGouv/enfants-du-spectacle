import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    montant: z.literal(true).optional(),
    nombre: z.literal(true).optional(),
    nombreLignes: z.literal(true).optional(),
    totalDadr: z.literal(true).optional(),
    enfantId: z.literal(true).optional(),
  })
  .strict();

export const RemunerationAvgAggregateInputObjectSchema = Schema;
