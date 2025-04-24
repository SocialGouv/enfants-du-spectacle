import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedCreateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateOrConnectWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DemandeurCreateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () =>
            DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DemandeurCreateOrConnectWithoutSocieteProductionInputObjectSchema =
  Schema;
