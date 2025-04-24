import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentaireScalarWhereInputObjectSchema),
        z.lazy(() => CommentaireScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentaireScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentaireScalarWhereInputObjectSchema),
        z.lazy(() => CommentaireScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    text: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    date: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    seen: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
  })
  .strict();

export const CommentaireScalarWhereInputObjectSchema = Schema;
