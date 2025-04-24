import { z } from 'zod';
import { CommentsCreateWithoutParentCommentInputObjectSchema } from './CommentsCreateWithoutParentCommentInput.schema';
import { CommentsUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedCreateWithoutParentCommentInput.schema';
import { CommentsCreateOrConnectWithoutParentCommentInputObjectSchema } from './CommentsCreateOrConnectWithoutParentCommentInput.schema';
import { CommentsCreateManyParentCommentInputEnvelopeObjectSchema } from './CommentsCreateManyParentCommentInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutParentCommentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentsCreateWithoutParentCommentInputObjectSchema),
          z
            .lazy(() => CommentsCreateWithoutParentCommentInputObjectSchema)
            .array(),
          z.lazy(
            () => CommentsUncheckedCreateWithoutParentCommentInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentsUncheckedCreateWithoutParentCommentInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CommentsCreateOrConnectWithoutParentCommentInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentsCreateOrConnectWithoutParentCommentInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentsCreateManyParentCommentInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentsUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema =
  Schema;
