import { z } from 'zod';
import { DossierCreateManyUserInputObjectSchema } from './DossierCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => DossierCreateManyUserInputObjectSchema),
      z.lazy(() => DossierCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const DossierCreateManyUserInputEnvelopeObjectSchema = Schema;
