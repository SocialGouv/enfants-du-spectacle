import { z } from 'zod';
import { CommissionCreateWithoutDossiersInputObjectSchema } from './CommissionCreateWithoutDossiersInput.schema';
import { CommissionUncheckedCreateWithoutDossiersInputObjectSchema } from './CommissionUncheckedCreateWithoutDossiersInput.schema';
import { CommissionCreateOrConnectWithoutDossiersInputObjectSchema } from './CommissionCreateOrConnectWithoutDossiersInput.schema';
import { CommissionUpsertWithoutDossiersInputObjectSchema } from './CommissionUpsertWithoutDossiersInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';
import { CommissionUpdateWithoutDossiersInputObjectSchema } from './CommissionUpdateWithoutDossiersInput.schema';
import { CommissionUncheckedUpdateWithoutDossiersInputObjectSchema } from './CommissionUncheckedUpdateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUpdateOneRequiredWithoutDossiersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommissionCreateWithoutDossiersInputObjectSchema),
          z.lazy(
            () => CommissionUncheckedCreateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommissionCreateOrConnectWithoutDossiersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CommissionUpsertWithoutDossiersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CommissionWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CommissionUpdateWithoutDossiersInputObjectSchema),
          z.lazy(
            () => CommissionUncheckedUpdateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const CommissionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema =
  Schema;
