import { z } from 'zod';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumSTATUT_PIECENullableFilter> = z
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
        z.lazy(() => NestedEnumSTATUT_PIECENullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumSTATUT_PIECENullableFilterObjectSchema = Schema;
