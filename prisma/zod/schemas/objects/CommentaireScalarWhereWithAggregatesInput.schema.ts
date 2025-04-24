import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentaireScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommentaireScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentaireScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentaireScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommentaireScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    text: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    date: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    seen: z
      .union([
        z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
        z.boolean(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CommentaireScalarWhereWithAggregatesInputObjectSchema = Schema;
