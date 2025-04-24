import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumSourcecommentWithAggregatesFilterObjectSchema } from './EnumSourcecommentWithAggregatesFilter.schema';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentsScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommentsScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentsScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentsScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommentsScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    text: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    source: z
      .union([
        z.lazy(() => EnumSourcecommentWithAggregatesFilterObjectSchema),
        z.lazy(() => SourcecommentSchema),
      ])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    enfantId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    commentsId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    externalUserId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    sender: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    seen: z
      .union([
        z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
        z.boolean(),
      ])
      .optional()
      .nullable(),
    date: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CommentsScalarWhereWithAggregatesInputObjectSchema = Schema;
