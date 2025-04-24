import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutCommissionInputObjectSchema } from './DossierCreateWithoutCommissionInput.schema';
import { DossierUncheckedCreateWithoutCommissionInputObjectSchema } from './DossierUncheckedCreateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutCommissionInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutCommissionInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutCommissionInputObjectSchema = Schema;
