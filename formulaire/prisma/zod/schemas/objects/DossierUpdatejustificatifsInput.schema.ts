import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdatejustificatifsInput> = z
  .object({
    set: z
      .lazy(() => JustificatifDossierSchema)
      .array()
      .optional(),
    push: z
      .union([
        z.lazy(() => JustificatifDossierSchema),
        z.lazy(() => JustificatifDossierSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const DossierUpdatejustificatifsInputObjectSchema = Schema;
