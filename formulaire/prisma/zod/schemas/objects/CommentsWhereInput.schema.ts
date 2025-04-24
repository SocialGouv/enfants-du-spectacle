import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSourcecommentFilterObjectSchema } from './EnumSourcecommentFilter.schema';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DossierRelationFilterObjectSchema } from './DossierRelationFilter.schema';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';
import { EnfantRelationFilterObjectSchema } from './EnfantRelationFilter.schema';
import { EnfantWhereInputObjectSchema } from './EnfantWhereInput.schema';
import { CommentsRelationFilterObjectSchema } from './CommentsRelationFilter.schema';
import { CommentsListRelationFilterObjectSchema } from './CommentsListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentsWhereInputObjectSchema),
        z.lazy(() => CommentsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentsWhereInputObjectSchema),
        z.lazy(() => CommentsWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    text: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    source: z
      .union([
        z.lazy(() => EnumSourcecommentFilterObjectSchema),
        z.lazy(() => SourcecommentSchema),
      ])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    enfantId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    commentsId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    externalUserId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    sender: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    seen: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    date: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    dossier: z
      .union([
        z.lazy(() => DossierRelationFilterObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema),
      ])
      .optional(),
    enfant: z
      .union([
        z.lazy(() => EnfantRelationFilterObjectSchema),
        z.lazy(() => EnfantWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    parentComment: z
      .union([
        z.lazy(() => CommentsRelationFilterObjectSchema),
        z.lazy(() => CommentsWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    Comments: z.lazy(() => CommentsListRelationFilterObjectSchema).optional(),
    User: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CommentsWhereInputObjectSchema = Schema;
