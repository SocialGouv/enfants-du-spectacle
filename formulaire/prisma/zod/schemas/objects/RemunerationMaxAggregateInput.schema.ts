import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    typeRemuneration: z.literal(true).optional(),
    natureCachet: z.literal(true).optional(),
    autreNatureCachet: z.literal(true).optional(),
    montant: z.literal(true).optional(),
    nombre: z.literal(true).optional(),
    nombreLignes: z.literal(true).optional(),
    totalDadr: z.literal(true).optional(),
    comment: z.literal(true).optional(),
    enfantId: z.literal(true).optional(),
  })
  .strict();

export const RemunerationMaxAggregateInputObjectSchema = Schema;
