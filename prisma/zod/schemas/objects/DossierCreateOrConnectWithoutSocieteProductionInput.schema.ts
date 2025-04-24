import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutSocieteProductionInputObjectSchema } from './DossierCreateWithoutSocieteProductionInput.schema';
import { DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema } from './DossierUncheckedCreateWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DossierCreateWithoutSocieteProductionInputObjectSchema),
        z.lazy(
          () => DossierUncheckedCreateWithoutSocieteProductionInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierCreateOrConnectWithoutSocieteProductionInputObjectSchema =
  Schema;
