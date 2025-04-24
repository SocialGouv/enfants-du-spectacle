import { z } from 'zod';
import { SessionCreateManyUserInputObjectSchema } from './SessionCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SessionCreateManyUserInputObjectSchema),
      z.lazy(() => SessionCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SessionCreateManyUserInputEnvelopeObjectSchema = Schema;
