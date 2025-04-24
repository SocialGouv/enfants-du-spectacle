import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
    externalId: z.literal(true).optional(),
    type: z.literal(true).optional(),
    link: z.literal(true).optional(),
    statut: z.literal(true).optional(),
  })
  .strict();

export const PieceDossierMinAggregateInputObjectSchema = Schema;
