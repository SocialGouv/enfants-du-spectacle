import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { NestedEnumSourcecommentFilterObjectSchema } from './NestedEnumSourcecommentFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSourcecommentFilter> = z
  .object({
    equals: z.lazy(() => SourcecommentSchema).optional(),
    in: z
      .union([
        z.lazy(() => SourcecommentSchema).array(),
        z.lazy(() => SourcecommentSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => SourcecommentSchema).array(),
        z.lazy(() => SourcecommentSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => SourcecommentSchema),
        z.lazy(() => NestedEnumSourcecommentFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumSourcecommentFilterObjectSchema = Schema;
