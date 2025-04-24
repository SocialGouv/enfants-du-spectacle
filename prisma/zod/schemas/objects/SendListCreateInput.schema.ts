import { z } from 'zod';
import { CommissionCreateNestedOneWithoutSendListInputObjectSchema } from './CommissionCreateNestedOneWithoutSendListInput.schema';
import { UserCreateNestedOneWithoutSendListInputObjectSchema } from './UserCreateNestedOneWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateInput> = z
  .object({
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    commission: z.lazy(
      () => CommissionCreateNestedOneWithoutSendListInputObjectSchema,
    ),
    user: z.lazy(() => UserCreateNestedOneWithoutSendListInputObjectSchema),
  })
  .strict();

export const SendListCreateInputObjectSchema = Schema;
