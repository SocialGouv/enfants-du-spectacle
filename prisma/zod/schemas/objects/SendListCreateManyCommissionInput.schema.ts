import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateManyCommissionInput> = z
  .object({
    id: z.number().optional(),
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    userId: z.number(),
  })
  .strict();

export const SendListCreateManyCommissionInputObjectSchema = Schema;
