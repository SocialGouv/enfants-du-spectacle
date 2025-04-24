import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutSocieteProductionInputObjectSchema } from './DossierUpdateWithoutSocieteProductionInput.schema';
import { DossierUncheckedUpdateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedUpdateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () => DossierUncheckedUpdateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierUpdateWithWhereUniqueWithoutSocieteProductionInputObjectSchema =
  Schema;
