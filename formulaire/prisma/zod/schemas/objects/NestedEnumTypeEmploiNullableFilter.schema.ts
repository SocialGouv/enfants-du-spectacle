import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTypeEmploiNullableFilter> = z
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
        z.lazy(() => NestedEnumTypeEmploiNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumTypeEmploiNullableFilterObjectSchema = Schema;
