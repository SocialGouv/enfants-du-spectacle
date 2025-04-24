import { z } from 'zod';
import { PieceDossierCreateWithoutDossierInputObjectSchema } from './PieceDossierCreateWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateWithoutDossierInput.schema';
import { PieceDossierCreateOrConnectWithoutDossierInputObjectSchema } from './PieceDossierCreateOrConnectWithoutDossierInput.schema';
import { PieceDossierCreateManyDossierInputEnvelopeObjectSchema } from './PieceDossierCreateManyDossierInputEnvelope.schema';
import { PieceDossierWhereUniqueInputObjectSchema } from './PieceDossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUncheckedCreateNestedManyWithoutDossierInput> =
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
      createMany: z
        .lazy(() => PieceDossierCreateManyDossierInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
          z.lazy(() => PieceDossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PieceDossierUncheckedCreateNestedManyWithoutDossierInputObjectSchema =
  Schema;
