import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateManyInput> = z
  .object({
    id: z.number().optional(),
    email: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    fonction: z.string().optional().nullable(),
    conventionCollectiveCode: z.string().optional().nullable(),
    otherConventionCollective: z.string().optional().nullable(),
    societeProductionId: z.number().optional().nullable(),
  })
  .strict();

export const DemandeurCreateManyInputObjectSchema = Schema;
