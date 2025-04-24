import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumJustificatifDossierFilterObjectSchema } from './NestedEnumJustificatifDossierFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumJustificatifDossierWithAggregatesFilter> =
  z
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
          z.lazy(
            () => NestedEnumJustificatifDossierWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumJustificatifDossierFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumJustificatifDossierFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumJustificatifDossierWithAggregatesFilterObjectSchema =
  Schema;
