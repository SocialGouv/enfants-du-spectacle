import { z } from 'zod';
import { SendListCreateManyCommissionInputObjectSchema } from './SendListCreateManyCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateManyCommissionInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SendListCreateManyCommissionInputObjectSchema),
      z.lazy(() => SendListCreateManyCommissionInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SendListCreateManyCommissionInputEnvelopeObjectSchema = Schema;
