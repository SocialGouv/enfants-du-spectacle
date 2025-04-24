import { z } from 'zod';
import { PieceDossierEnfantCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateOrConnectWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateOrConnectWithoutEnfantInput.schema';
import { PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateManyEnfantInputEnvelopeObjectSchema } from './PieceDossierEnfantCreateManyEnfantInputEnvelope.schema';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInput.schema';
import { PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInput.schema';
import { PieceDossierEnfantScalarWhereInputObjectSchema } from './PieceDossierEnfantScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUpdateManyWithoutEnfantNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PieceDossierEnfantCreateWithoutEnfantInputObjectSchema),
          z
            .lazy(() => PieceDossierEnfantCreateWithoutEnfantInputObjectSchema)
            .array(),
          z.lazy(
            () =>
              PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              PieceDossierEnfantCreateOrConnectWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantCreateOrConnectWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PieceDossierEnfantCreateManyEnfantInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema),
          z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PieceDossierEnfantUpdateManyWithoutEnfantNestedInputObjectSchema =
  Schema;
