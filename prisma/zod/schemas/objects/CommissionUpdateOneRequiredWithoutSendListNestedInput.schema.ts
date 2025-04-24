import { z } from 'zod';
import { CommissionCreateWithoutSendListInputObjectSchema } from './CommissionCreateWithoutSendListInput.schema';
import { CommissionUncheckedCreateWithoutSendListInputObjectSchema } from './CommissionUncheckedCreateWithoutSendListInput.schema';
import { CommissionCreateOrConnectWithoutSendListInputObjectSchema } from './CommissionCreateOrConnectWithoutSendListInput.schema';
import { CommissionUpsertWithoutSendListInputObjectSchema } from './CommissionUpsertWithoutSendListInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';
import { CommissionUpdateWithoutSendListInputObjectSchema } from './CommissionUpdateWithoutSendListInput.schema';
import { CommissionUncheckedUpdateWithoutSendListInputObjectSchema } from './CommissionUncheckedUpdateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUpdateOneRequiredWithoutSendListNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommissionCreateWithoutSendListInputObjectSchema),
          z.lazy(
            () => CommissionUncheckedCreateWithoutSendListInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommissionCreateOrConnectWithoutSendListInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CommissionUpsertWithoutSendListInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CommissionWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CommissionUpdateWithoutSendListInputObjectSchema),
          z.lazy(
            () => CommissionUncheckedUpdateWithoutSendListInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const CommissionUpdateOneRequiredWithoutSendListNestedInputObjectSchema =
  Schema;
