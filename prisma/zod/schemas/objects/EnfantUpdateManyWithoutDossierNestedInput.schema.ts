import { z } from 'zod';
import { EnfantCreateWithoutDossierInputObjectSchema } from './EnfantCreateWithoutDossierInput.schema';
import { EnfantUncheckedCreateWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutDossierInput.schema';
import { EnfantCreateOrConnectWithoutDossierInputObjectSchema } from './EnfantCreateOrConnectWithoutDossierInput.schema';
import { EnfantUpsertWithWhereUniqueWithoutDossierInputObjectSchema } from './EnfantUpsertWithWhereUniqueWithoutDossierInput.schema';
import { EnfantCreateManyDossierInputEnvelopeObjectSchema } from './EnfantCreateManyDossierInputEnvelope.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithWhereUniqueWithoutDossierInputObjectSchema } from './EnfantUpdateWithWhereUniqueWithoutDossierInput.schema';
import { EnfantUpdateManyWithWhereWithoutDossierInputObjectSchema } from './EnfantUpdateManyWithWhereWithoutDossierInput.schema';
import { EnfantScalarWhereInputObjectSchema } from './EnfantScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateManyWithoutDossierNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EnfantCreateWithoutDossierInputObjectSchema),
        z.lazy(() => EnfantCreateWithoutDossierInputObjectSchema).array(),
        z.lazy(() => EnfantUncheckedCreateWithoutDossierInputObjectSchema),
        z
          .lazy(() => EnfantUncheckedCreateWithoutDossierInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EnfantCreateOrConnectWithoutDossierInputObjectSchema),
        z
          .lazy(() => EnfantCreateOrConnectWithoutDossierInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => EnfantUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
        ),
        z
          .lazy(
            () => EnfantUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => EnfantCreateManyDossierInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => EnfantWhereUniqueInputObjectSchema),
        z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => EnfantWhereUniqueInputObjectSchema),
        z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => EnfantWhereUniqueInputObjectSchema),
        z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => EnfantWhereUniqueInputObjectSchema),
        z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => EnfantUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
        ),
        z
          .lazy(
            () => EnfantUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => EnfantUpdateManyWithWhereWithoutDossierInputObjectSchema),
        z
          .lazy(() => EnfantUpdateManyWithWhereWithoutDossierInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => EnfantScalarWhereInputObjectSchema),
        z.lazy(() => EnfantScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const EnfantUpdateManyWithoutDossierNestedInputObjectSchema = Schema;
