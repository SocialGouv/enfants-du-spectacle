import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateOrConnectWithoutDemandeurInput> =
  z
    .object({
      where: z.lazy(() => SocieteProductionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => SocieteProductionCreateWithoutDemandeurInputObjectSchema),
        z.lazy(
          () =>
            SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const SocieteProductionCreateOrConnectWithoutDemandeurInputObjectSchema =
  Schema;
