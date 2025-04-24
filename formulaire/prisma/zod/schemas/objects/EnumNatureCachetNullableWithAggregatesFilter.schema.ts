import { z } from 'zod';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';
import { NestedEnumNatureCachetNullableWithAggregatesFilterObjectSchema } from './NestedEnumNatureCachetNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumNatureCachetNullableFilterObjectSchema } from './NestedEnumNatureCachetNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumNatureCachetNullableWithAggregatesFilter> = z
  .object({
    equals: z
      .lazy(() => NatureCachetSchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => NatureCachetSchema).array(),
        z.lazy(() => NatureCachetSchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => NatureCachetSchema).array(),
        z.lazy(() => NatureCachetSchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => NatureCachetSchema),
        z.lazy(
          () => NestedEnumNatureCachetNullableWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z
      .lazy(() => NestedEnumNatureCachetNullableFilterObjectSchema)
      .optional(),
    _max: z
      .lazy(() => NestedEnumNatureCachetNullableFilterObjectSchema)
      .optional(),
  })
  .strict();

export const EnumNatureCachetNullableWithAggregatesFilterObjectSchema = Schema;
