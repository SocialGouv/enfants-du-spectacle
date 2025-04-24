import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUncheckedCreateWithoutCommissionInput> =
  z
    .object({
      id: z.number().optional(),
      send: z.boolean(),
      lastSent: z.coerce.date().optional().nullable(),
      userId: z.number(),
    })
    .strict();

export const SendListUncheckedCreateWithoutCommissionInputObjectSchema = Schema;
