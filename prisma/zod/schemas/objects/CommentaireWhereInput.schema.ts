import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { DossierRelationFilterObjectSchema } from './DossierRelationFilter.schema';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentaireWhereInputObjectSchema),
        z.lazy(() => CommentaireWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentaireWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentaireWhereInputObjectSchema),
        z.lazy(() => CommentaireWhereInputObjectSchema).array(),
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
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dossier: z
      .union([
        z.lazy(() => DossierRelationFilterObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CommentaireWhereInputObjectSchema = Schema;
