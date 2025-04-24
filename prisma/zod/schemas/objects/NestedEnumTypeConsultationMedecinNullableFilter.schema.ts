import { z } from 'zod';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTypeConsultationMedecinNullableFilter> =
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
            () => NestedEnumTypeConsultationMedecinNullableFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumTypeConsultationMedecinNullableFilterObjectSchema =
  Schema;
