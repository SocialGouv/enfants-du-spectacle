import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutMedecinInputObjectSchema } from './DossierUpdateWithoutMedecinInput.schema';
import { DossierUncheckedUpdateWithoutMedecinInputObjectSchema } from './DossierUncheckedUpdateWithoutMedecinInput.schema';
import { DossierCreateWithoutMedecinInputObjectSchema } from './DossierCreateWithoutMedecinInput.schema';
import { DossierUncheckedCreateWithoutMedecinInputObjectSchema } from './DossierUncheckedCreateWithoutMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutMedecinInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DossierUpdateWithoutMedecinInputObjectSchema),
        z.lazy(() => DossierUncheckedUpdateWithoutMedecinInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => DossierCreateWithoutMedecinInputObjectSchema),
        z.lazy(() => DossierUncheckedCreateWithoutMedecinInputObjectSchema),
      ]),
    })
    .strict();

export const DossierUpsertWithWhereUniqueWithoutMedecinInputObjectSchema =
  Schema;
