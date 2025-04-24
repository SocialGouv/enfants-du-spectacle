import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutParentCommentInputObjectSchema } from './CommentsUpdateWithoutParentCommentInput.schema';
import { CommentsUncheckedUpdateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedUpdateWithoutParentCommentInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutParentCommentInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentsUpdateWithoutParentCommentInputObjectSchema),
        z.lazy(
          () => CommentsUncheckedUpdateWithoutParentCommentInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CommentsUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema =
  Schema;
