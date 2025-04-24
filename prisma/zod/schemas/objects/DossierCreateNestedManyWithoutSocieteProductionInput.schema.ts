import { z } from 'zod';
import { DossierCreateWithoutSocieteProductionInputObjectSchema } from './DossierCreateWithoutSocieteProductionInput.schema';
import { DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedCreateWithoutSocieteProductionInput.schema';
import { DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema } from './DossierCreateOrConnectWithoutSocieteProductionInput.schema';
import { DossierCreateManySocieteProductionInputEnvelopeObjectSchema } from './DossierCreateManySocieteProductionInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedManyWithoutSocieteProductionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema),
          z
            .lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema)
            .array(),
          z.lazy(
            () =>
              DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManySocieteProductionInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DossierCreateNestedManyWithoutSocieteProductionInputObjectSchema =
  Schema;
