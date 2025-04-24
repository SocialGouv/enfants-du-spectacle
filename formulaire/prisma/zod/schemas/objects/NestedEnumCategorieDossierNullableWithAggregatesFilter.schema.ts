import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumCategorieDossierNullableFilterObjectSchema } from './NestedEnumCategorieDossierNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumCategorieDossierNullableWithAggregatesFilter> =
  z
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
          z.lazy(
            () =>
              NestedEnumCategorieDossierNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumCategorieDossierNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumCategorieDossierNullableFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumCategorieDossierNullableWithAggregatesFilterObjectSchema =
  Schema;
