import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedCreateWithoutDossiersInput> = z
  .object({
    id: z.number().optional(),
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    phone: z.string().optional().nullable(),
    fonction: z.string(),
    societeProductionId: z.number(),
  })
  .strict();

export const DemandeurUncheckedCreateWithoutDossiersInputObjectSchema = Schema;
