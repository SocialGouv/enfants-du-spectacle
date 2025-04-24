import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutCommissionInputObjectSchema } from './DossierUpdateWithoutCommissionInput.schema';
import { DossierUncheckedUpdateWithoutCommissionInputObjectSchema } from './DossierUncheckedUpdateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateWithoutCommissionInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutCommissionInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpdateWithWhereUniqueWithoutCommissionInputObjectSchema =
  Schema;
