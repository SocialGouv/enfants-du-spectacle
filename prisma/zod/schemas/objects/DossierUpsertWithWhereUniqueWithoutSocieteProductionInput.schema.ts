import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutSocieteProductionInputObjectSchema } from './DossierUpdateWithoutSocieteProductionInput.schema';
import { DossierUncheckedUpdateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedUpdateWithoutSocieteProductionInput.schema';
import { DossierCreateWithoutSocieteProductionInputObjectSchema } from './DossierCreateWithoutSocieteProductionInput.schema';
import { DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedCreateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DossierUpdateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () => DossierUncheckedUpdateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () => DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierUpsertWithWhereUniqueWithoutSocieteProductionInputObjectSchema =
  Schema;
