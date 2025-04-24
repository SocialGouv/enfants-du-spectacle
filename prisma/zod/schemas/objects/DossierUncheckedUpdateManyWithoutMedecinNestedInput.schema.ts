import { z } from 'zod';
import { DossierCreateWithoutMedecinInputObjectSchema } from './DossierCreateWithoutMedecinInput.schema';
import { DossierUncheckedCreateWithoutMedecinInputObjectSchema } from './DossierUncheckedCreateWithoutMedecinInput.schema';
import { DossierCreateOrConnectWithoutMedecinInputObjectSchema } from './DossierCreateOrConnectWithoutMedecinInput.schema';
import { DossierUpsertWithWhereUniqueWithoutMedecinInputObjectSchema } from './DossierUpsertWithWhereUniqueWithoutMedecinInput.schema';
import { DossierCreateManyMedecinInputEnvelopeObjectSchema } from './DossierCreateManyMedecinInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithWhereUniqueWithoutMedecinInputObjectSchema } from './DossierUpdateWithWhereUniqueWithoutMedecinInput.schema';
import { DossierUpdateManyWithWhereWithoutMedecinInputObjectSchema } from './DossierUpdateManyWithWhereWithoutMedecinInput.schema';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutMedecinNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutMedecinInputObjectSchema),
          z.lazy(() => DossierCreateWithoutMedecinInputObjectSchema).array(),
          z.lazy(() => DossierUncheckedCreateWithoutMedecinInputObjectSchema),
          z
            .lazy(() => DossierUncheckedCreateWithoutMedecinInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DossierCreateOrConnectWithoutMedecinInputObjectSchema),
          z
            .lazy(() => DossierCreateOrConnectWithoutMedecinInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => DossierUpsertWithWhereUniqueWithoutMedecinInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUpsertWithWhereUniqueWithoutMedecinInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManyMedecinInputEnvelopeObjectSchema)
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
            () => DossierUpdateWithWhereUniqueWithoutMedecinInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUpdateWithWhereUniqueWithoutMedecinInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => DossierUpdateManyWithWhereWithoutMedecinInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUpdateManyWithWhereWithoutMedecinInputObjectSchema,
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

export const DossierUncheckedUpdateManyWithoutMedecinNestedInputObjectSchema =
  Schema;
