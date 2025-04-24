import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumJustificatifDossierNullableListFilter> = z
  .object({
    equals: z
      .lazy(() => JustificatifDossierSchema)
      .array()
      .optional()
      .nullable(),
    has: z
      .lazy(() => JustificatifDossierSchema)
      .optional()
      .nullable(),
    hasEvery: z
      .lazy(() => JustificatifDossierSchema)
      .array()
      .optional(),
    hasSome: z
      .lazy(() => JustificatifDossierSchema)
      .array()
      .optional(),
    isEmpty: z.boolean().optional(),
  })
  .strict();

export const EnumJustificatifDossierNullableListFilterObjectSchema = Schema;
