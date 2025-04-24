import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutEnfantsInputObjectSchema } from './DossierCreateWithoutEnfantsInput.schema';
import { DossierUncheckedCreateWithoutEnfantsInputObjectSchema } from './DossierUncheckedCreateWithoutEnfantsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutEnfantsInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutEnfantsInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutEnfantsInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutEnfantsInputObjectSchema = Schema;
