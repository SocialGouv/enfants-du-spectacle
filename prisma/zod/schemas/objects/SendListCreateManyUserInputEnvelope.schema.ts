import { z } from 'zod';
import { SendListCreateManyUserInputObjectSchema } from './SendListCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SendListCreateManyUserInputObjectSchema),
      z.lazy(() => SendListCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SendListCreateManyUserInputEnvelopeObjectSchema = Schema;
