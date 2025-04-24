import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeursInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateOrConnectWithoutDemandeursInput> =
  z
    .object({
      where: z.lazy(() => SocieteProductionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => SocieteProductionCreateWithoutDemandeursInputObjectSchema),
        z.lazy(
          () =>
            SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const SocieteProductionCreateOrConnectWithoutDemandeursInputObjectSchema =
  Schema;
