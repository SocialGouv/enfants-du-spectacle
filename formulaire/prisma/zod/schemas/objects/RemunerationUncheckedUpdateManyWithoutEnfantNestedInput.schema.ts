import { z } from 'zod';
import { RemunerationCreateWithoutEnfantInputObjectSchema } from './RemunerationCreateWithoutEnfantInput.schema';
import { RemunerationUncheckedCreateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedCreateWithoutEnfantInput.schema';
import { RemunerationCreateOrConnectWithoutEnfantInputObjectSchema } from './RemunerationCreateOrConnectWithoutEnfantInput.schema';
import { RemunerationUpsertWithWhereUniqueWithoutEnfantInputObjectSchema } from './RemunerationUpsertWithWhereUniqueWithoutEnfantInput.schema';
import { RemunerationCreateManyEnfantInputEnvelopeObjectSchema } from './RemunerationCreateManyEnfantInputEnvelope.schema';
import { RemunerationWhereUniqueInputObjectSchema } from './RemunerationWhereUniqueInput.schema';
import { RemunerationUpdateWithWhereUniqueWithoutEnfantInputObjectSchema } from './RemunerationUpdateWithWhereUniqueWithoutEnfantInput.schema';
import { RemunerationUpdateManyWithWhereWithoutEnfantInputObjectSchema } from './RemunerationUpdateManyWithWhereWithoutEnfantInput.schema';
import { RemunerationScalarWhereInputObjectSchema } from './RemunerationScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUncheckedUpdateManyWithoutEnfantNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema),
          z
            .lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema)
            .array(),
          z.lazy(
            () => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RemunerationCreateOrConnectWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => RemunerationCreateOrConnectWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              RemunerationUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RemunerationUpsertWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RemunerationCreateManyEnfantInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RemunerationUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RemunerationUpdateWithWhereUniqueWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => RemunerationUpdateManyWithWhereWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RemunerationUpdateManyWithWhereWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RemunerationScalarWhereInputObjectSchema),
          z.lazy(() => RemunerationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RemunerationUncheckedUpdateManyWithoutEnfantNestedInputObjectSchema =
  Schema;
