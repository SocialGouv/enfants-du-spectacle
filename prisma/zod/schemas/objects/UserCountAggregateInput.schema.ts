import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    prenom: z.literal(true).optional(),
    email: z.literal(true).optional(),
    emailVerified: z.literal(true).optional(),
    image: z.literal(true).optional(),
    role: z.literal(true).optional(),
    departement: z.literal(true).optional(),
    departements: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const UserCountAggregateInputObjectSchema = Schema;
