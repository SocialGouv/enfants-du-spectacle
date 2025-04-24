import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { DossierCreateNestedOneWithoutCommentsInputObjectSchema } from './DossierCreateNestedOneWithoutCommentsInput.schema';
import { EnfantCreateNestedOneWithoutCommentsInputObjectSchema } from './EnfantCreateNestedOneWithoutCommentsInput.schema';
import { CommentsCreateNestedOneWithoutCommentsInputObjectSchema } from './CommentsCreateNestedOneWithoutCommentsInput.schema';
import { UserCreateNestedOneWithoutCommentsInputObjectSchema } from './UserCreateNestedOneWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateWithoutCommentsInput> = z
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
    enfant: z
      .lazy(() => EnfantCreateNestedOneWithoutCommentsInputObjectSchema)
      .optional(),
    parentComment: z
      .lazy(() => CommentsCreateNestedOneWithoutCommentsInputObjectSchema)
      .optional(),
    User: z
      .lazy(() => UserCreateNestedOneWithoutCommentsInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentsCreateWithoutCommentsInputObjectSchema = Schema;
