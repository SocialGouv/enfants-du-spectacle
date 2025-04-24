import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurUpdateWithoutSocieteProductionInputObjectSchema } from './DemandeurUpdateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedUpdateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedUpdateWithoutSocieteProductionInput.schema';
import { DemandeurCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedCreateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DemandeurUpdateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () =>
            DemandeurUncheckedUpdateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => DemandeurCreateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () =>
            DemandeurUncheckedCreateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DemandeurUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema =
  Schema;
