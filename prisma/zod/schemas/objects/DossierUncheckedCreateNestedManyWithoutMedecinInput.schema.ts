import { z } from 'zod';
import { DossierCreateWithoutMedecinInputObjectSchema } from './DossierCreateWithoutMedecinInput.schema';
import { DossierUncheckedCreateWithoutMedecinInputObjectSchema } from './DossierUncheckedCreateWithoutMedecinInput.schema';
import { DossierCreateOrConnectWithoutMedecinInputObjectSchema } from './DossierCreateOrConnectWithoutMedecinInput.schema';
import { DossierCreateManyMedecinInputEnvelopeObjectSchema } from './DossierCreateManyMedecinInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutMedecinInput> =
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
      createMany: z
        .lazy(() => DossierCreateManyMedecinInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DossierUncheckedCreateNestedManyWithoutMedecinInputObjectSchema =
  Schema;
