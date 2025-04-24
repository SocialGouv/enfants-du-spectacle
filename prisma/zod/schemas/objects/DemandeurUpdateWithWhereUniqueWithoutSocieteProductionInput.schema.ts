import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurUpdateWithoutSocieteProductionInputObjectSchema } from './DemandeurUpdateWithoutSocieteProductionInput.schema';
import { DemandeurUncheckedUpdateWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedUpdateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DemandeurUpdateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () =>
            DemandeurUncheckedUpdateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DemandeurUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema =
  Schema;
