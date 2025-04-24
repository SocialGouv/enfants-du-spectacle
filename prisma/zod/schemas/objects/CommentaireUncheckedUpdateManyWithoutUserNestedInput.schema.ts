import { z } from 'zod';
import { CommentaireCreateWithoutUserInputObjectSchema } from './CommentaireCreateWithoutUserInput.schema';
import { CommentaireUncheckedCreateWithoutUserInputObjectSchema } from './CommentaireUncheckedCreateWithoutUserInput.schema';
import { CommentaireCreateOrConnectWithoutUserInputObjectSchema } from './CommentaireCreateOrConnectWithoutUserInput.schema';
import { CommentaireUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CommentaireUpsertWithWhereUniqueWithoutUserInput.schema';
import { CommentaireCreateManyUserInputEnvelopeObjectSchema } from './CommentaireCreateManyUserInputEnvelope.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CommentaireUpdateWithWhereUniqueWithoutUserInput.schema';
import { CommentaireUpdateManyWithWhereWithoutUserInputObjectSchema } from './CommentaireUpdateManyWithWhereWithoutUserInput.schema';
import { CommentaireScalarWhereInputObjectSchema } from './CommentaireScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema),
          z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentaireCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => CommentaireCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CommentaireUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentaireUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentaireCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => CommentaireUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentaireUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CommentaireUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentaireUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentaireScalarWhereInputObjectSchema),
          z.lazy(() => CommentaireScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentaireUncheckedUpdateManyWithoutUserNestedInputObjectSchema =
  Schema;
