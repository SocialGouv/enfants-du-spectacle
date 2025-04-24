import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutMedecinInputObjectSchema } from './DossierUpdateWithoutMedecinInput.schema';
import { DossierUncheckedUpdateWithoutMedecinInputObjectSchema } from './DossierUncheckedUpdateWithoutMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutMedecinInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateWithoutMedecinInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutMedecinInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpdateWithWhereUniqueWithoutMedecinInputObjectSchema =
  Schema;
