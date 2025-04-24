import { z } from 'zod';
import { EnfantCreateManyDossierInputObjectSchema } from './EnfantCreateManyDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateManyDossierInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => EnfantCreateManyDossierInputObjectSchema),
      z.lazy(() => EnfantCreateManyDossierInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const EnfantCreateManyDossierInputEnvelopeObjectSchema = Schema;
