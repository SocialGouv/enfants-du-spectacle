import { z } from 'zod';
import { SendListUncheckedCreateNestedManyWithoutCommissionInputObjectSchema } from './SendListUncheckedCreateNestedManyWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUncheckedCreateWithoutDossiersInput> =
  z
    .object({
      id: z.number().optional(),
      departement: z.string(),
      date: z.coerce.date(),
      dateLimiteDepot: z.coerce.date(),
      lastSent: z.coerce.date().optional().nullable(),
      archived: z.boolean().optional().nullable(),
      SendList: z
        .lazy(
          () =>
            SendListUncheckedCreateNestedManyWithoutCommissionInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const CommissionUncheckedCreateWithoutDossiersInputObjectSchema = Schema;
