import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutCommissionInputObjectSchema } from './DossierUpdateWithoutCommissionInput.schema';
import { DossierUncheckedUpdateWithoutCommissionInputObjectSchema } from './DossierUncheckedUpdateWithoutCommissionInput.schema';
import { DossierCreateWithoutCommissionInputObjectSchema } from './DossierCreateWithoutCommissionInput.schema';
import { DossierUncheckedCreateWithoutCommissionInputObjectSchema } from './DossierUncheckedCreateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DossierUpdateWithoutCommissionInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutCommissionInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema),
        z.lazy(() => DossierUncheckedCreateWithoutCommissionInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpsertWithWhereUniqueWithoutCommissionInputObjectSchema =
  Schema;
