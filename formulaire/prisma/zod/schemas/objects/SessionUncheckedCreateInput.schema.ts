import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    sessionToken: z.string(),
    userId: z.number(),
    expires: z.coerce.date(),
  })
  .strict();

export const SessionUncheckedCreateInputObjectSchema = Schema;
