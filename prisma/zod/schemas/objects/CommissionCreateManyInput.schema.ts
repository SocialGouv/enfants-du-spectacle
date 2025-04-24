import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateManyInput> = z
  .object({
    id: z.number().optional(),
    departement: z.string(),
    date: z.coerce.date(),
    dateLimiteDepot: z.coerce.date(),
    lastSent: z.coerce.date().optional().nullable(),
    archived: z.boolean().optional().nullable(),
  })
  .strict();

export const CommissionCreateManyInputObjectSchema = Schema;
