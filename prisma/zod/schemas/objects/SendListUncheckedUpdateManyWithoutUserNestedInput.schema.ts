import { z } from 'zod';
import { SendListCreateWithoutUserInputObjectSchema } from './SendListCreateWithoutUserInput.schema';
import { SendListUncheckedCreateWithoutUserInputObjectSchema } from './SendListUncheckedCreateWithoutUserInput.schema';
import { SendListCreateOrConnectWithoutUserInputObjectSchema } from './SendListCreateOrConnectWithoutUserInput.schema';
import { SendListUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './SendListUpsertWithWhereUniqueWithoutUserInput.schema';
import { SendListCreateManyUserInputEnvelopeObjectSchema } from './SendListCreateManyUserInputEnvelope.schema';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './SendListUpdateWithWhereUniqueWithoutUserInput.schema';
import { SendListUpdateManyWithWhereWithoutUserInputObjectSchema } from './SendListUpdateManyWithWhereWithoutUserInput.schema';
import { SendListScalarWhereInputObjectSchema } from './SendListScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SendListCreateWithoutUserInputObjectSchema),
          z.lazy(() => SendListCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SendListCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => SendListCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => SendListUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SendListCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SendListWhereUniqueInputObjectSchema),
          z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SendListWhereUniqueInputObjectSchema),
          z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SendListWhereUniqueInputObjectSchema),
          z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SendListWhereUniqueInputObjectSchema),
          z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SendListUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SendListUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => SendListUpdateManyWithWhereWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SendListScalarWhereInputObjectSchema),
          z.lazy(() => SendListScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SendListUncheckedUpdateManyWithoutUserNestedInputObjectSchema =
  Schema;
