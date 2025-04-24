import { z } from 'zod';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { NestedEnumStatusNotifNullableWithAggregatesFilterObjectSchema } from './NestedEnumStatusNotifNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumStatusNotifNullableFilterObjectSchema } from './NestedEnumStatusNotifNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatusNotifNullableWithAggregatesFilter> = z
  .object({
    equals: z
      .lazy(() => StatusNotifSchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => StatusNotifSchema).array(),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => StatusNotifSchema).array(),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => StatusNotifSchema),
        z.lazy(
          () => NestedEnumStatusNotifNullableWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z
      .lazy(() => NestedEnumStatusNotifNullableFilterObjectSchema)
      .optional(),
    _max: z
      .lazy(() => NestedEnumStatusNotifNullableFilterObjectSchema)
      .optional(),
  })
  .strict();

export const EnumStatusNotifNullableWithAggregatesFilterObjectSchema = Schema;
