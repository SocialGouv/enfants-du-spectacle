import { z } from 'zod';
import { DossierCreateNestedManyWithoutCommissionInputObjectSchema } from './DossierCreateNestedManyWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateWithoutSendListInput> = z
  .object({
    departement: z.string(),
    date: z.coerce.date(),
    dateLimiteDepot: z.coerce.date(),
    lastSent: z.coerce.date().optional().nullable(),
    archived: z.boolean().optional().nullable(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutCommissionInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommissionCreateWithoutSendListInputObjectSchema = Schema;
