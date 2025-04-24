import { z } from 'zod';
import { PieceDossierEnfantCreateManyEnfantInputObjectSchema } from './PieceDossierEnfantCreateManyEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantCreateManyEnfantInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PieceDossierEnfantCreateManyEnfantInputObjectSchema),
        z
          .lazy(() => PieceDossierEnfantCreateManyEnfantInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PieceDossierEnfantCreateManyEnfantInputEnvelopeObjectSchema =
  Schema;
