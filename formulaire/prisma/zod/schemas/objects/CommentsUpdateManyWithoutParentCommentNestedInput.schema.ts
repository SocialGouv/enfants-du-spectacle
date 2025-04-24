import { z } from 'zod';
import { CommentsCreateWithoutParentCommentInputObjectSchema } from './CommentsCreateWithoutParentCommentInput.schema';
import { CommentsUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentsUncheckedCreateWithoutParentCommentInput.schema';
import { CommentsCreateOrConnectWithoutParentCommentInputObjectSchema } from './CommentsCreateOrConnectWithoutParentCommentInput.schema';
import { CommentsUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema } from './CommentsUpsertWithWhereUniqueWithoutParentCommentInput.schema';
import { CommentsCreateManyParentCommentInputEnvelopeObjectSchema } from './CommentsCreateManyParentCommentInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema } from './CommentsUpdateWithWhereUniqueWithoutParentCommentInput.schema';
import { CommentsUpdateManyWithWhereWithoutParentCommentInputObjectSchema } from './CommentsUpdateManyWithWhereWithoutParentCommentInput.schema';
import { CommentsScalarWhereInputObjectSchema } from './CommentsScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateManyWithoutParentCommentNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              CommentsUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentsUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentsCreateManyParentCommentInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CommentsUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentsUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              CommentsUpdateManyWithWhereWithoutParentCommentInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentsUpdateManyWithWhereWithoutParentCommentInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentsScalarWhereInputObjectSchema),
          z.lazy(() => CommentsScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentsUpdateManyWithoutParentCommentNestedInputObjectSchema =
  Schema;
