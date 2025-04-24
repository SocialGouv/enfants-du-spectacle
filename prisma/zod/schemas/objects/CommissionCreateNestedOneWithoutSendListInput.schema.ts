import { z } from 'zod';
import { CommissionCreateWithoutSendListInputObjectSchema } from './CommissionCreateWithoutSendListInput.schema';
import { CommissionUncheckedCreateWithoutSendListInputObjectSchema } from './CommissionUncheckedCreateWithoutSendListInput.schema';
import { CommissionCreateOrConnectWithoutSendListInputObjectSchema } from './CommissionCreateOrConnectWithoutSendListInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateNestedOneWithoutSendListInput> =
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
      connect: z.lazy(() => CommissionWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const CommissionCreateNestedOneWithoutSendListInputObjectSchema = Schema;
