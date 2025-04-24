import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumCategorieDossierFilter> = z
  .object({
    equals: z.lazy(() => CategorieDossierSchema).optional(),
    in: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => CategorieDossierSchema),
        z.lazy(() => NestedEnumCategorieDossierFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumCategorieDossierFilterObjectSchema = Schema;
