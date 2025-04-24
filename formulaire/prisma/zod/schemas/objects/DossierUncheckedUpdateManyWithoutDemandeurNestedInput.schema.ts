import { z } from 'zod';
import { DossierCreateWithoutDemandeurInputObjectSchema } from './DossierCreateWithoutDemandeurInput.schema';
import { DossierUncheckedCreateWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateWithoutDemandeurInput.schema';
import { DossierCreateOrConnectWithoutDemandeurInputObjectSchema } from './DossierCreateOrConnectWithoutDemandeurInput.schema';
import { DossierUpsertWithWhereUniqueWithoutDemandeurInputObjectSchema } from './DossierUpsertWithWhereUniqueWithoutDemandeurInput.schema';
import { DossierCreateManyDemandeurInputEnvelopeObjectSchema } from './DossierCreateManyDemandeurInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithWhereUniqueWithoutDemandeurInputObjectSchema } from './DossierUpdateWithWhereUniqueWithoutDemandeurInput.schema';
import { DossierUpdateManyWithWhereWithoutDemandeurInputObjectSchema } from './DossierUpdateManyWithWhereWithoutDemandeurInput.schema';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutDemandeurNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema),
          z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema).array(),
          z.lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema),
          z
            .lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DossierCreateOrConnectWithoutDemandeurInputObjectSchema),
          z
            .lazy(() => DossierCreateOrConnectWithoutDemandeurInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => DossierUpsertWithWhereUniqueWithoutDemandeurInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpsertWithWhereUniqueWithoutDemandeurInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManyDemandeurInputEnvelopeObjectSchema)
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
            () => DossierUpdateWithWhereUniqueWithoutDemandeurInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUpdateWithWhereUniqueWithoutDemandeurInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => DossierUpdateManyWithWhereWithoutDemandeurInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUpdateManyWithWhereWithoutDemandeurInputObjectSchema,
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

export const DossierUncheckedUpdateManyWithoutDemandeurNestedInputObjectSchema =
  Schema;
