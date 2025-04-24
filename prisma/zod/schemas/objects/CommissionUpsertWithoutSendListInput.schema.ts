import { z } from 'zod';
import { CommissionUpdateWithoutSendListInputObjectSchema } from './CommissionUpdateWithoutSendListInput.schema';
import { CommissionUncheckedUpdateWithoutSendListInputObjectSchema } from './CommissionUncheckedUpdateWithoutSendListInput.schema';
import { CommissionCreateWithoutSendListInputObjectSchema } from './CommissionCreateWithoutSendListInput.schema';
import { CommissionUncheckedCreateWithoutSendListInputObjectSchema } from './CommissionUncheckedCreateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUpsertWithoutSendListInput> = z
  .object({
    update: z.union([
      z.lazy(() => CommissionUpdateWithoutSendListInputObjectSchema),
      z.lazy(() => CommissionUncheckedUpdateWithoutSendListInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CommissionCreateWithoutSendListInputObjectSchema),
      z.lazy(() => CommissionUncheckedCreateWithoutSendListInputObjectSchema),
    ]),
  })
  .strict();

export const CommissionUpsertWithoutSendListInputObjectSchema = Schema;
