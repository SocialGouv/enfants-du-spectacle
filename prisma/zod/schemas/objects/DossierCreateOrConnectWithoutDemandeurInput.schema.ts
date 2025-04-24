import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutDemandeurInputObjectSchema } from './DossierCreateWithoutDemandeurInput.schema';
import { DossierUncheckedCreateWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutDemandeurInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutDemandeurInputObjectSchema = Schema;
