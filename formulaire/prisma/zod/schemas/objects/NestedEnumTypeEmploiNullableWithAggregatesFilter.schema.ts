import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumTypeEmploiNullableFilterObjectSchema } from './NestedEnumTypeEmploiNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTypeEmploiNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => TypeEmploiSchema)
        .optional()
        .nullable(),
      in: z
        .union([
          z.lazy(() => TypeEmploiSchema).array(),
          z.lazy(() => TypeEmploiSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.lazy(() => TypeEmploiSchema).array(),
          z.lazy(() => TypeEmploiSchema),
        ])
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => TypeEmploiSchema),
          z.lazy(
            () => NestedEnumTypeEmploiNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumTypeEmploiNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumTypeEmploiNullableFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumTypeEmploiNullableWithAggregatesFilterObjectSchema =
  Schema;
