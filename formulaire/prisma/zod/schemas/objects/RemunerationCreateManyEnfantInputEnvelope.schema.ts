import { z } from 'zod';
import { RemunerationCreateManyEnfantInputObjectSchema } from './RemunerationCreateManyEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationCreateManyEnfantInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => RemunerationCreateManyEnfantInputObjectSchema),
      z.lazy(() => RemunerationCreateManyEnfantInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RemunerationCreateManyEnfantInputEnvelopeObjectSchema = Schema;
