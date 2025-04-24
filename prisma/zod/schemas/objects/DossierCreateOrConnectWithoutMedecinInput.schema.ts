import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutMedecinInputObjectSchema } from './DossierCreateWithoutMedecinInput.schema';
import { DossierUncheckedCreateWithoutMedecinInputObjectSchema } from './DossierUncheckedCreateWithoutMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutMedecinInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutMedecinInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutMedecinInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutMedecinInputObjectSchema = Schema;
