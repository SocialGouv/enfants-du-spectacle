import { z } from 'zod';
import { DemandeurCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedCreateWithoutSocieteProductionInput.schema';
import { DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateOrConnectWithoutSocieteProductionInput.schema';
import { DemandeurCreateManySocieteProductionInputEnvelopeObjectSchema } from './DemandeurCreateManySocieteProductionInputEnvelope.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedCreateNestedManyWithoutSocieteProductionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => DemandeurCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () => DemandeurCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => DemandeurCreateManySocieteProductionInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
          z.lazy(() => DemandeurWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DemandeurUncheckedCreateNestedManyWithoutSocieteProductionInputObjectSchema =
  Schema;
