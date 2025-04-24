import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantAvgAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    nombreJours: z.literal(true).optional(),
    montantCachet: z.literal(true).optional(),
    nombreCachets: z.literal(true).optional(),
    nombreLignes: z.literal(true).optional(),
    remunerationTotale: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
    cdc: z.literal(true).optional(),
  })
  .strict();

export const EnfantAvgAggregateInputObjectSchema = Schema;
