import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { NestedEnumCategorieDossierNullableFilterObjectSchema } from './NestedEnumCategorieDossierNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumCategorieDossierNullableFilter> = z
  .object({
    equals: z
      .lazy(() => CategorieDossierSchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => CategorieDossierSchema),
        z.lazy(() => NestedEnumCategorieDossierNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const EnumCategorieDossierNullableFilterObjectSchema = Schema;
