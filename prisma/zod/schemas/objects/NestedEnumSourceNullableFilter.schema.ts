import { z } from 'zod';
import { SourceSchema } from '../enums/Source.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumSourceNullableFilter> = z
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
        z.lazy(() => NestedEnumSourceNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumSourceNullableFilterObjectSchema = Schema;
