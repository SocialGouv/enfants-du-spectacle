import { z } from 'zod';
import { DossierCreateWithoutUserInputObjectSchema } from './DossierCreateWithoutUserInput.schema';
import { DossierUncheckedCreateWithoutUserInputObjectSchema } from './DossierUncheckedCreateWithoutUserInput.schema';
import { DossierCreateOrConnectWithoutUserInputObjectSchema } from './DossierCreateOrConnectWithoutUserInput.schema';
import { DossierUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './DossierUpsertWithWhereUniqueWithoutUserInput.schema';
import { DossierCreateManyUserInputEnvelopeObjectSchema } from './DossierCreateManyUserInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './DossierUpdateWithWhereUniqueWithoutUserInput.schema';
import { DossierUpdateManyWithWhereWithoutUserInputObjectSchema } from './DossierUpdateManyWithWhereWithoutUserInput.schema';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateManyWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DossierCreateWithoutUserInputObjectSchema),
        z.lazy(() => DossierCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DossierCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => DossierUpsertWithWhereUniqueWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierUpsertWithWhereUniqueWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DossierCreateManyUserInputEnvelopeObjectSchema)
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
        z.lazy(() => DossierUpdateWithWhereUniqueWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierUpdateWithWhereUniqueWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => DossierUpdateManyWithWhereWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierUpdateManyWithWhereWithoutUserInputObjectSchema)
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

export const DossierUpdateManyWithoutUserNestedInputObjectSchema = Schema;
