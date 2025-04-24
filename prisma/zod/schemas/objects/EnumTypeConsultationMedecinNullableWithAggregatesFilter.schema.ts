import { z } from 'zod';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';
import { NestedEnumTypeConsultationMedecinNullableWithAggregatesFilterObjectSchema } from './NestedEnumTypeConsultationMedecinNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumTypeConsultationMedecinNullableFilterObjectSchema } from './NestedEnumTypeConsultationMedecinNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumTypeConsultationMedecinNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => TypeConsultationMedecinSchema)
        .optional()
        .nullable(),
      in: z
        .union([
          z.lazy(() => TypeConsultationMedecinSchema).array(),
          z.lazy(() => TypeConsultationMedecinSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.lazy(() => TypeConsultationMedecinSchema).array(),
          z.lazy(() => TypeConsultationMedecinSchema),
        ])
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => TypeConsultationMedecinSchema),
          z.lazy(
            () =>
              NestedEnumTypeConsultationMedecinNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumTypeConsultationMedecinNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumTypeConsultationMedecinNullableFilterObjectSchema)
        .optional(),
    })
    .strict();

export const EnumTypeConsultationMedecinNullableWithAggregatesFilterObjectSchema =
  Schema;
