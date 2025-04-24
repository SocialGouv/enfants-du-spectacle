import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionCreateWithoutDossiersInputObjectSchema } from './SocieteProductionCreateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateOrConnectWithoutDossiersInput> =
  z
    .object({
      where: z.lazy(() => SocieteProductionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => SocieteProductionCreateWithoutDossiersInputObjectSchema),
        z.lazy(
          () =>
            SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const SocieteProductionCreateOrConnectWithoutDossiersInputObjectSchema =
  Schema;
