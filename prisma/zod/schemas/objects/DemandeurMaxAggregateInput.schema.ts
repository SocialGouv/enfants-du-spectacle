import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    prenom: z.literal(true).optional(),
    phone: z.literal(true).optional(),
    fonction: z.literal(true).optional(),
    societeProductionId: z.literal(true).optional(),
  })
  .strict();

export const DemandeurMaxAggregateInputObjectSchema = Schema;
