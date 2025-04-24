import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    commissionId: z.number(),
    userId: z.number(),
  })
  .strict();

export const SendListUncheckedCreateInputObjectSchema = Schema;
