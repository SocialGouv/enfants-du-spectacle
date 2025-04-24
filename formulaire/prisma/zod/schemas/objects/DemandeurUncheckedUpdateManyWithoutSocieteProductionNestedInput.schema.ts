import { z } from 'zod';
import { DemandeurCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedCreateWithoutSocieteProductionInput.schema';
import { DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateOrConnectWithoutSocieteProductionInput.schema';
import { DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema } from './DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInput.schema';
import { DemandeurCreateManySocieteProductionInputEnvelopeObjectSchema } from './DemandeurCreateManySocieteProductionInputEnvelope.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema } from './DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInput.schema';
import { DemandeurUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema } from './DemandeurUpdateManyWithWhereWithoutSocieteProductionInput.schema';
import { DemandeurScalarWhereInputObjectSchema } from './DemandeurScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedUpdateManyWithoutSocieteProductionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => DemandeurCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () => DemandeurCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => DemandeurCreateManySocieteProductionInputEnvelopeObjectSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              DemandeurUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DemandeurScalarWhereInputObjectSchema),
          z.lazy(() => DemandeurScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DemandeurUncheckedUpdateManyWithoutSocieteProductionNestedInputObjectSchema =
  Schema;
