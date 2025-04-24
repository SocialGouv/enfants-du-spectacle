import { z } from 'zod';
import { DossierCreateNestedManyWithoutCommissionInputObjectSchema } from './DossierCreateNestedManyWithoutCommissionInput.schema';
import { SendListCreateNestedManyWithoutCommissionInputObjectSchema } from './SendListCreateNestedManyWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateInput> = z
  .object({
    departement: z.string(),
    date: z.coerce.date(),
    dateLimiteDepot: z.coerce.date(),
    lastSent: z.coerce.date().optional().nullable(),
    archived: z.boolean().optional().nullable(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutCommissionInputObjectSchema)
      .optional(),
    SendList: z
      .lazy(() => SendListCreateNestedManyWithoutCommissionInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommissionCreateInputObjectSchema = Schema;
