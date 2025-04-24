import { z } from 'zod';
import { SocieteProductionCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeurInput.schema';
import { SocieteProductionCreateOrConnectWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDemandeurInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateNestedOneWithoutDemandeurInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => SocieteProductionCreateWithoutDemandeurInputObjectSchema,
          ),
          z.lazy(
            () =>
              SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            SocieteProductionCreateOrConnectWithoutDemandeurInputObjectSchema,
        )
        .optional(),
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();

export const SocieteProductionCreateNestedOneWithoutDemandeurInputObjectSchema =
  Schema;
