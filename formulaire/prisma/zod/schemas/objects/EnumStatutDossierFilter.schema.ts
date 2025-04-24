import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { NestedEnumStatutDossierFilterObjectSchema } from './NestedEnumStatutDossierFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatutDossierFilter> = z
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

export const EnumStatutDossierFilterObjectSchema = Schema;
