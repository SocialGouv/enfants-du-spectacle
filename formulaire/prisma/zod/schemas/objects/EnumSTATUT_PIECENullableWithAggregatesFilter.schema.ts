import { z } from 'zod';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { NestedEnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema } from './NestedEnumSTATUT_PIECENullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumSTATUT_PIECENullableFilterObjectSchema } from './NestedEnumSTATUT_PIECENullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSTATUT_PIECENullableWithAggregatesFilter> = z
  .object({
    equals: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => STATUT_PIECESchema).array(),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => STATUT_PIECESchema).array(),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => STATUT_PIECESchema),
        z.lazy(
          () => NestedEnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z
      .lazy(() => NestedEnumSTATUT_PIECENullableFilterObjectSchema)
      .optional(),
    _max: z
      .lazy(() => NestedEnumSTATUT_PIECENullableFilterObjectSchema)
      .optional(),
  })
  .strict();

export const EnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema = Schema;
