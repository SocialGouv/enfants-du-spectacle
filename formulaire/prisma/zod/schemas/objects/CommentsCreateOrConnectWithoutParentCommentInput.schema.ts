import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsCreateWithoutParentCommentInputObjectSchema } from './CommentsCreateWithoutParentCommentInput.schema';
import { CommentsUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedCreateWithoutParentCommentInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutParentCommentInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CommentsCreateWithoutParentCommentInputObjectSchema),
        z.lazy(
          () => CommentsUncheckedCreateWithoutParentCommentInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CommentsCreateOrConnectWithoutParentCommentInputObjectSchema =
  Schema;
