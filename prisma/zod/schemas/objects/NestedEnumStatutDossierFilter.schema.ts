import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumStatutDossierFilter> = z
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
        z.lazy(() => NestedEnumStatutDossierFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumStatutDossierFilterObjectSchema = Schema;
