import { z } from 'zod';
import { AccountCreateManyUserInputObjectSchema } from './AccountCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => AccountCreateManyUserInputObjectSchema),
      z.lazy(() => AccountCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const AccountCreateManyUserInputEnvelopeObjectSchema = Schema;
