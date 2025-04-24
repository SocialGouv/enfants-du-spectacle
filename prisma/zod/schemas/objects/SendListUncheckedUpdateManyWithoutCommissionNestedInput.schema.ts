import { z } from 'zod';
import { SendListCreateWithoutCommissionInputObjectSchema } from './SendListCreateWithoutCommissionInput.schema';
import { SendListUncheckedCreateWithoutCommissionInputObjectSchema } from './SendListUncheckedCreateWithoutCommissionInput.schema';
import { SendListCreateOrConnectWithoutCommissionInputObjectSchema } from './SendListCreateOrConnectWithoutCommissionInput.schema';
import { SendListUpsertWithWhereUniqueWithoutCommissionInputObjectSchema } from './SendListUpsertWithWhereUniqueWithoutCommissionInput.schema';
import { SendListCreateManyCommissionInputEnvelopeObjectSchema } from './SendListCreateManyCommissionInputEnvelope.schema';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithWhereUniqueWithoutCommissionInputObjectSchema } from './SendListUpdateWithWhereUniqueWithoutCommissionInput.schema';
import { SendListUpdateManyWithWhereWithoutCommissionInputObjectSchema } from './SendListUpdateManyWithWhereWithoutCommissionInput.schema';
import { SendListScalarWhereInputObjectSchema } from './SendListScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUncheckedUpdateManyWithoutCommissionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SendListCreateWithoutCommissionInputObjectSchema),
          z
            .lazy(() => SendListCreateWithoutCommissionInputObjectSchema)
            .array(),
          z.lazy(
            () => SendListUncheckedCreateWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListUncheckedCreateWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SendListCreateOrConnectWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListCreateOrConnectWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              SendListUpsertWithWhereUniqueWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                SendListUpsertWithWhereUniqueWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SendListCreateManyCommissionInputEnvelopeObjectSchema)
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
            () =>
              SendListUpdateWithWhereUniqueWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                SendListUpdateWithWhereUniqueWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => SendListUpdateManyWithWhereWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                SendListUpdateManyWithWhereWithoutCommissionInputObjectSchema,
            )
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

export const SendListUncheckedUpdateManyWithoutCommissionNestedInputObjectSchema =
  Schema;
