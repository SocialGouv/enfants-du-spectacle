import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z
  .object({
    id: z.number().optional(),
    identifier: z.string(),
    token: z.string(),
    expires: z.coerce.date(),
  })
  .strict();

export const VerificationTokenCreateManyInputObjectSchema = Schema;
