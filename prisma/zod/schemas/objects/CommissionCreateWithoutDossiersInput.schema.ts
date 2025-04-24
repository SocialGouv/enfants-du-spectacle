import { z } from 'zod';
import { SendListCreateNestedManyWithoutCommissionInputObjectSchema } from './SendListCreateNestedManyWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateWithoutDossiersInput> = z
  .object({
    departement: z.string(),
    date: z.coerce.date(),
    dateLimiteDepot: z.coerce.date(),
    lastSent: z.coerce.date().optional().nullable(),
    archived: z.boolean().optional().nullable(),
    SendList: z
      .lazy(() => SendListCreateNestedManyWithoutCommissionInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommissionCreateWithoutDossiersInputObjectSchema = Schema;
