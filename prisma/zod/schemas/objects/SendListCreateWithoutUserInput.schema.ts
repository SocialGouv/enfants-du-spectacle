import { z } from 'zod';
import { CommissionCreateNestedOneWithoutSendListInputObjectSchema } from './CommissionCreateNestedOneWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateWithoutUserInput> = z
  .object({
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    commission: z.lazy(
      () => CommissionCreateNestedOneWithoutSendListInputObjectSchema,
    ),
  })
  .strict();

export const SendListCreateWithoutUserInputObjectSchema = Schema;
