import { z } from 'zod';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTypeConsultationNullableFilter> = z
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
        z.lazy(() => NestedEnumTypeConsultationNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumTypeConsultationNullableFilterObjectSchema = Schema;
