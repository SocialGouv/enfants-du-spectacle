import { z } from 'zod';
import { CommentsCreateWithoutUserInputObjectSchema } from './CommentsCreateWithoutUserInput.schema';
import { CommentsUncheckedCreateWithoutUserInputObjectSchema } from './CommentsUncheckedCreateWithoutUserInput.schema';
import { CommentsCreateOrConnectWithoutUserInputObjectSchema } from './CommentsCreateOrConnectWithoutUserInput.schema';
import { CommentsUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CommentsUpsertWithWhereUniqueWithoutUserInput.schema';
import { CommentsCreateManyUserInputEnvelopeObjectSchema } from './CommentsCreateManyUserInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CommentsUpdateWithWhereUniqueWithoutUserInput.schema';
import { CommentsUpdateManyWithWhereWithoutUserInputObjectSchema } from './CommentsUpdateManyWithWhereWithoutUserInput.schema';
import { CommentsScalarWhereInputObjectSchema } from './CommentsScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentsCreateWithoutUserInputObjectSchema),
          z.lazy(() => CommentsCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentsCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => CommentsCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CommentsUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentsUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentsCreateManyUserInputEnvelopeObjectSchema)
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
            () => CommentsUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentsUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentsUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => CommentsUpdateManyWithWhereWithoutUserInputObjectSchema)
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

export const CommentsUncheckedUpdateManyWithoutUserNestedInputObjectSchema =
  Schema;
