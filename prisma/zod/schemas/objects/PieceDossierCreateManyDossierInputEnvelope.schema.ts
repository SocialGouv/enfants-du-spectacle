import { z } from 'zod';
import { PieceDossierCreateManyDossierInputObjectSchema } from './PieceDossierCreateManyDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierCreateManyDossierInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => PieceDossierCreateManyDossierInputObjectSchema),
      z.lazy(() => PieceDossierCreateManyDossierInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PieceDossierCreateManyDossierInputEnvelopeObjectSchema = Schema;
