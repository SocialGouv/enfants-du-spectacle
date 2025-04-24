import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStatutDossierFilterObjectSchema } from './NestedEnumStatutDossierFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumStatutDossierWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => StatutDossierSchema).optional(),
    in: z
      .union([
        z.lazy(() => StatutDossierSchema).array(),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => StatutDossierSchema).array(),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => StatutDossierSchema),
        z.lazy(() => NestedEnumStatutDossierWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumStatutDossierFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumStatutDossierFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumStatutDossierWithAggregatesFilterObjectSchema = Schema;
