import { z } from 'zod';
import { UserCreateNestedOneWithoutSendListInputObjectSchema } from './UserCreateNestedOneWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateWithoutCommissionInput> = z
  .object({
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutSendListInputObjectSchema),
  })
  .strict();

export const SendListCreateWithoutCommissionInputObjectSchema = Schema;
