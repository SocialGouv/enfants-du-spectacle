import { z } from 'zod';
import { DossierUncheckedCreateNestedManyWithoutCommissionInputObjectSchema } from './DossierUncheckedCreateNestedManyWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUncheckedCreateWithoutSendListInput> =
  z
    .object({
      id: z.number().optional(),
      departement: z.string(),
      date: z.coerce.date(),
      dateLimiteDepot: z.coerce.date(),
      lastSent: z.coerce.date().optional().nullable(),
      archived: z.boolean().optional().nullable(),
      dossiers: z
        .lazy(
          () =>
            DossierUncheckedCreateNestedManyWithoutCommissionInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const CommissionUncheckedCreateWithoutSendListInputObjectSchema = Schema;
