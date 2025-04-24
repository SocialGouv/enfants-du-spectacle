import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    sessionToken: z.string(),
    expires: z.coerce.date(),
  })
  .strict();

export const SessionUncheckedCreateWithoutUserInputObjectSchema = Schema;
