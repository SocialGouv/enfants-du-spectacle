import { z } from 'zod';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumNatureCachetNullableFilter> = z
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
        z.lazy(() => NestedEnumNatureCachetNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumNatureCachetNullableFilterObjectSchema = Schema;
