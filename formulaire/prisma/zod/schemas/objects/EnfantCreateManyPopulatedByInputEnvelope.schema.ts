import { z } from 'zod';
import { EnfantCreateManyPopulatedByInputObjectSchema } from './EnfantCreateManyPopulatedByInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateManyPopulatedByInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => EnfantCreateManyPopulatedByInputObjectSchema),
      z.lazy(() => EnfantCreateManyPopulatedByInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const EnfantCreateManyPopulatedByInputEnvelopeObjectSchema = Schema;
