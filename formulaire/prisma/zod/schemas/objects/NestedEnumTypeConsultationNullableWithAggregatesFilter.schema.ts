import { z } from 'zod';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumTypeConsultationNullableFilterObjectSchema } from './NestedEnumTypeConsultationNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTypeConsultationNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => TypeConsultationSchema)
        .optional()
        .nullable(),
      in: z
        .union([
          z.lazy(() => TypeConsultationSchema).array(),
          z.lazy(() => TypeConsultationSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.lazy(() => TypeConsultationSchema).array(),
          z.lazy(() => TypeConsultationSchema),
        ])
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => TypeConsultationSchema),
          z.lazy(
            () =>
              NestedEnumTypeConsultationNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumTypeConsultationNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumTypeConsultationNullableFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumTypeConsultationNullableWithAggregatesFilterObjectSchema =
  Schema;
