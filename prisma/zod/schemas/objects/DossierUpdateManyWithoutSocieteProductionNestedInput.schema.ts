import { z } from 'zod';
import { DossierCreateWithoutSocieteProductionInputObjectSchema } from './DossierCreateWithoutSocieteProductionInput.schema';
import { DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedCreateWithoutSocieteProductionInput.schema';
import { DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema } from './DossierCreateOrConnectWithoutSocieteProductionInput.schema';
import { DossierUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema } from './DossierUpsertWithWhereUniqueWithoutSocieteProductionInput.schema';
import { DossierCreateManySocieteProductionInputEnvelopeObjectSchema } from './DossierCreateManySocieteProductionInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema } from './DossierUpdateWithWhereUniqueWithoutSocieteProductionInput.schema';
import { DossierUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema } from './DossierUpdateManyWithWhereWithoutSocieteProductionInput.schema';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateManyWithoutSocieteProductionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema),
          z
            .lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema)
            .array(),
          z.lazy(
            () =>
              DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              DossierUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManySocieteProductionInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              DossierUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              DossierUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DossierScalarWhereInputObjectSchema),
          z.lazy(() => DossierScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DossierUpdateManyWithoutSocieteProductionNestedInputObjectSchema =
  Schema;
