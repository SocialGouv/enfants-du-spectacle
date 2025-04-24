import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutDemandeurInputObjectSchema } from './DossierUpdateWithoutDemandeurInput.schema';
import { DossierUncheckedUpdateWithoutDemandeurInputObjectSchema } from './DossierUncheckedUpdateWithoutDemandeurInput.schema';
import { DossierCreateWithoutDemandeurInputObjectSchema } from './DossierCreateWithoutDemandeurInput.schema';
import { DossierUncheckedCreateWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutDemandeurInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DossierUpdateWithoutDemandeurInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutDemandeurInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema),
        z.lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpsertWithWhereUniqueWithoutDemandeurInputObjectSchema =
  Schema;
