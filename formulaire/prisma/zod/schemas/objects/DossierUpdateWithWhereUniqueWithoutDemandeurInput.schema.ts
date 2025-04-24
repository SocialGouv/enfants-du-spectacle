import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutDemandeurInputObjectSchema } from './DossierUpdateWithoutDemandeurInput.schema';
import { DossierUncheckedUpdateWithoutDemandeurInputObjectSchema } from './DossierUncheckedUpdateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutDemandeurInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateWithoutDemandeurInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutDemandeurInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpdateWithWhereUniqueWithoutDemandeurInputObjectSchema =
  Schema;
