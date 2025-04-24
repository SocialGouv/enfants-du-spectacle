import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateManyUserInput> = z
  .object({
    id: z.number().optional(),
    send: z.boolean(),
    lastSent: z.coerce.date().optional().nullable(),
    commissionId: z.number(),
  })
  .strict();

export const SendListCreateManyUserInputObjectSchema = Schema;
