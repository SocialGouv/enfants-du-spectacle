import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { NestedEnumSourcecommentWithAggregatesFilterObjectSchema } from './NestedEnumSourcecommentWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSourcecommentFilterObjectSchema } from './NestedEnumSourcecommentFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSourcecommentWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumSourcecommentWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumSourcecommentFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumSourcecommentFilterObjectSchema).optional(),
  })
  .strict();

export const EnumSourcecommentWithAggregatesFilterObjectSchema = Schema;
