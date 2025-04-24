import { z } from 'zod';
import { EnfantCreateWithoutPopulatedByInputObjectSchema } from './EnfantCreateWithoutPopulatedByInput.schema';
import { EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedCreateWithoutPopulatedByInput.schema';
import { EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema } from './EnfantCreateOrConnectWithoutPopulatedByInput.schema';
import { EnfantUpsertWithWhereUniqueWithoutPopulatedByInputObjectSchema } from './EnfantUpsertWithWhereUniqueWithoutPopulatedByInput.schema';
import { EnfantCreateManyPopulatedByInputEnvelopeObjectSchema } from './EnfantCreateManyPopulatedByInputEnvelope.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithWhereUniqueWithoutPopulatedByInputObjectSchema } from './EnfantUpdateWithWhereUniqueWithoutPopulatedByInput.schema';
import { EnfantUpdateManyWithWhereWithoutPopulatedByInputObjectSchema } from './EnfantUpdateManyWithWhereWithoutPopulatedByInput.schema';
import { EnfantScalarWhereInputObjectSchema } from './EnfantScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateManyWithoutPopulatedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema),
          z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema).array(),
          z.lazy(
            () => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () => EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              EnfantUpsertWithWhereUniqueWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                EnfantUpsertWithWhereUniqueWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => EnfantCreateManyPopulatedByInputEnvelopeObjectSchema)
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
            () =>
              EnfantUpdateWithWhereUniqueWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                EnfantUpdateWithWhereUniqueWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => EnfantUpdateManyWithWhereWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                EnfantUpdateManyWithWhereWithoutPopulatedByInputObjectSchema,
            )
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

export const EnfantUpdateManyWithoutPopulatedByNestedInputObjectSchema = Schema;
