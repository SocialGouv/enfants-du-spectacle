import { z } from 'zod';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';
import { CommissionCreateWithoutSendListInputObjectSchema } from './CommissionCreateWithoutSendListInput.schema';
import { CommissionUncheckedCreateWithoutSendListInputObjectSchema } from './CommissionUncheckedCreateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateOrConnectWithoutSendListInput> =
  z
    .object({
      where: z.lazy(() => CommissionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CommissionCreateWithoutSendListInputObjectSchema),
        z.lazy(() => CommissionUncheckedCreateWithoutSendListInputObjectSchema),
      ]),
    })
    .strict();

export const CommissionCreateOrConnectWithoutSendListInputObjectSchema = Schema;
