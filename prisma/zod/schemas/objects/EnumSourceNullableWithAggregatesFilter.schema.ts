import { z } from 'zod';
import { SourceSchema } from '../enums/Source.schema';
import { NestedEnumSourceNullableWithAggregatesFilterObjectSchema } from './NestedEnumSourceNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumSourceNullableFilterObjectSchema } from './NestedEnumSourceNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSourceNullableWithAggregatesFilter> = z
  .object({
    equals: z
      .lazy(() => SourceSchema)
      .optional()
      .nullable(),
    in: z
      .union([z.lazy(() => SourceSchema).array(), z.lazy(() => SourceSchema)])
      .optional()
      .nullable(),
    notIn: z
      .union([z.lazy(() => SourceSchema).array(), z.lazy(() => SourceSchema)])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => SourceSchema),
        z.lazy(() => NestedEnumSourceNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumSourceNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumSourceNullableFilterObjectSchema).optional(),
  })
  .strict();

export const EnumSourceNullableWithAggregatesFilterObjectSchema = Schema;
