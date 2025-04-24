import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { DossierCreateNestedOneWithoutCommentsInputObjectSchema } from './DossierCreateNestedOneWithoutCommentsInput.schema';
import { CommentsCreateNestedOneWithoutCommentsInputObjectSchema } from './CommentsCreateNestedOneWithoutCommentsInput.schema';
import { CommentsCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentsCreateNestedManyWithoutParentCommentInput.schema';
import { UserCreateNestedOneWithoutCommentsInputObjectSchema } from './UserCreateNestedOneWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateWithoutEnfantInput> = z
  .object({
    text: z.string(),
    source: z.lazy(() => SourcecommentSchema),
    externalUserId: z.number().optional().nullable(),
    sender: z.string().optional().nullable(),
    seen: z.boolean().optional().nullable(),
    date: z.coerce.date().optional().nullable(),
    dossier: z.lazy(
      () => DossierCreateNestedOneWithoutCommentsInputObjectSchema,
    ),
    parentComment: z
      .lazy(() => CommentsCreateNestedOneWithoutCommentsInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsCreateNestedManyWithoutParentCommentInputObjectSchema)
      .optional(),
    User: z
      .lazy(() => UserCreateNestedOneWithoutCommentsInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentsCreateWithoutEnfantInputObjectSchema = Schema;
