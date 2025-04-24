import { z } from 'zod';
import { PieceDossierCreateWithoutDossierInputObjectSchema } from './PieceDossierCreateWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateWithoutDossierInput.schema';
import { PieceDossierCreateOrConnectWithoutDossierInputObjectSchema } from './PieceDossierCreateOrConnectWithoutDossierInput.schema';
import { PieceDossierUpsertWithWhereUniqueWithoutDossierInputObjectSchema } from './PieceDossierUpsertWithWhereUniqueWithoutDossierInput.schema';
import { PieceDossierCreateManyDossierInputEnvelopeObjectSchema } from './PieceDossierCreateManyDossierInputEnvelope.schema';
import { PieceDossierWhereUniqueInputObjectSchema } from './PieceDossierWhereUniqueInput.schema';
import { PieceDossierUpdateWithWhereUniqueWithoutDossierInputObjectSchema } from './PieceDossierUpdateWithWhereUniqueWithoutDossierInput.schema';
import { PieceDossierUpdateManyWithWhereWithoutDossierInputObjectSchema } from './PieceDossierUpdateManyWithWhereWithoutDossierInput.schema';
import { PieceDossierScalarWhereInputObjectSchema } from './PieceDossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUncheckedUpdateManyWithoutDossierNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PieceDossierCreateWithoutDossierInputObjectSchema),
          z
            .lazy(() => PieceDossierCreateWithoutDossierInputObjectSchema)
            .array(),
          z.lazy(
            () => PieceDossierUncheckedCreateWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () => PieceDossierUncheckedCreateWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PieceDossierCreateOrConnectWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () => PieceDossierCreateOrConnectWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PieceDossierUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PieceDossierCreateManyDossierInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PieceDossierUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              PieceDossierUpdateManyWithWhereWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierUpdateManyWithWhereWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PieceDossierScalarWhereInputObjectSchema),
          z.lazy(() => PieceDossierScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PieceDossierUncheckedUpdateManyWithoutDossierNestedInputObjectSchema =
  Schema;
