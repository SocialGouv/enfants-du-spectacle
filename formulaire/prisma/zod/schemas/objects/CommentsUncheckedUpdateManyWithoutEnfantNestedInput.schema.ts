import { z } from 'zod';
import { CommentsCreateWithoutEnfantInputObjectSchema } from './CommentsCreateWithoutEnfantInput.schema';
import { CommentsUncheckedCreateWithoutEnfantInputObjectSchema } from './CommentsUncheckedCreateWithoutEnfantInput.schema';
import { CommentsCreateOrConnectWithoutEnfantInputObjectSchema } from './CommentsCreateOrConnectWithoutEnfantInput.schema';
import { CommentsUpsertWithWhereUniqueWithoutEnfantInputObjectSchema } from './CommentsUpsertWithWhereUniqueWithoutEnfantInput.schema';
import { CommentsCreateManyEnfantInputEnvelopeObjectSchema } from './CommentsCreateManyEnfantInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithWhereUniqueWithoutEnfantInputObjectSchema } from './CommentsUpdateWithWhereUniqueWithoutEnfantInput.schema';
import { CommentsUpdateManyWithWhereWithoutEnfantInputObjectSchema } from './CommentsUpdateManyWithWhereWithoutEnfantInput.schema';
import { CommentsScalarWhereInputObjectSchema } from './CommentsScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutEnfantNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema),
          z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema).array(),
          z.lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema),
          z
            .lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentsCreateOrConnectWithoutEnfantInputObjectSchema),
          z
            .lazy(() => CommentsCreateOrConnectWithoutEnfantInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CommentsUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentsUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentsCreateManyEnfantInputEnvelopeObjectSchema)
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
            () => CommentsUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentsUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CommentsUpdateManyWithWhereWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentsUpdateManyWithWhereWithoutEnfantInputObjectSchema,
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

export const CommentsUncheckedUpdateManyWithoutEnfantNestedInputObjectSchema =
  Schema;
