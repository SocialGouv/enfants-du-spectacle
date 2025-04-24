import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumJustificatifDossierFilter> = z
  .object({
    equals: z.lazy(() => JustificatifDossierSchema).optional(),
    in: z
      .union([
        z.lazy(() => JustificatifDossierSchema).array(),
        z.lazy(() => JustificatifDossierSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => JustificatifDossierSchema).array(),
        z.lazy(() => JustificatifDossierSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => JustificatifDossierSchema),
        z.lazy(() => NestedEnumJustificatifDossierFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumJustificatifDossierFilterObjectSchema = Schema;
