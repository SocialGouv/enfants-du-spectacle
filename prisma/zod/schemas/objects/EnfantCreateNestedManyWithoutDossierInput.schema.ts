import { z } from 'zod';
import { EnfantCreateWithoutDossierInputObjectSchema } from './EnfantCreateWithoutDossierInput.schema';
import { EnfantUncheckedCreateWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutDossierInput.schema';
import { EnfantCreateOrConnectWithoutDossierInputObjectSchema } from './EnfantCreateOrConnectWithoutDossierInput.schema';
import { EnfantCreateManyDossierInputEnvelopeObjectSchema } from './EnfantCreateManyDossierInputEnvelope.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateNestedManyWithoutDossierInput> = z
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
    createMany: z
      .lazy(() => EnfantCreateManyDossierInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => EnfantWhereUniqueInputObjectSchema),
        z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const EnfantCreateNestedManyWithoutDossierInputObjectSchema = Schema;
