import { z } from 'zod';
import { PieceDossierEnfantCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateOrConnectWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateOrConnectWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateManyEnfantInputEnvelopeObjectSchema } from './PieceDossierEnfantCreateManyEnfantInputEnvelope.schema';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './PieceDossierEnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUncheckedCreateNestedManyWithoutEnfantInput> =
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
      createMany: z
        .lazy(() => PieceDossierEnfantCreateManyEnfantInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PieceDossierEnfantUncheckedCreateNestedManyWithoutEnfantInputObjectSchema =
  Schema;
