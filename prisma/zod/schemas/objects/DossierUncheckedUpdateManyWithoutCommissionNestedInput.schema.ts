import { z } from 'zod';
import { DossierCreateWithoutCommissionInputObjectSchema } from './DossierCreateWithoutCommissionInput.schema';
import { DossierUncheckedCreateWithoutCommissionInputObjectSchema } from './DossierUncheckedCreateWithoutCommissionInput.schema';
import { DossierCreateOrConnectWithoutCommissionInputObjectSchema } from './DossierCreateOrConnectWithoutCommissionInput.schema';
import { DossierUpsertWithWhereUniqueWithoutCommissionInputObjectSchema } from './DossierUpsertWithWhereUniqueWithoutCommissionInput.schema';
import { DossierCreateManyCommissionInputEnvelopeObjectSchema } from './DossierCreateManyCommissionInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithWhereUniqueWithoutCommissionInputObjectSchema } from './DossierUpdateWithWhereUniqueWithoutCommissionInput.schema';
import { DossierUpdateManyWithWhereWithoutCommissionInputObjectSchema } from './DossierUpdateManyWithWhereWithoutCommissionInput.schema';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutCommissionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema),
          z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema).array(),
          z.lazy(
            () => DossierUncheckedCreateWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUncheckedCreateWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => DossierCreateOrConnectWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierCreateOrConnectWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              DossierUpsertWithWhereUniqueWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpsertWithWhereUniqueWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManyCommissionInputEnvelopeObjectSchema)
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
              DossierUpdateWithWhereUniqueWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpdateWithWhereUniqueWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => DossierUpdateManyWithWhereWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpdateManyWithWhereWithoutCommissionInputObjectSchema,
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

export const DossierUncheckedUpdateManyWithoutCommissionNestedInputObjectSchema =
  Schema;
