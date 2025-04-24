import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutParentCommentInputObjectSchema } from './CommentsUpdateWithoutParentCommentInput.schema';
import { CommentsUncheckedUpdateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedUpdateWithoutParentCommentInput.schema';
import { CommentsCreateWithoutParentCommentInputObjectSchema } from './CommentsCreateWithoutParentCommentInput.schema';
import { CommentsUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedCreateWithoutParentCommentInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutParentCommentInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentsUpdateWithoutParentCommentInputObjectSchema),
        z.lazy(
          () => CommentsUncheckedUpdateWithoutParentCommentInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => CommentsCreateWithoutParentCommentInputObjectSchema),
        z.lazy(
          () => CommentsUncheckedCreateWithoutParentCommentInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CommentsUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema =
  Schema;
