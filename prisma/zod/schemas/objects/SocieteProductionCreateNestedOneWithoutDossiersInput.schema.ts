import { z } from 'zod';
import { SocieteProductionCreateWithoutDossiersInputObjectSchema } from './SocieteProductionCreateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDossiersInput.schema';
import { SocieteProductionCreateOrConnectWithoutDossiersInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDossiersInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateNestedOneWithoutDossiersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SocieteProductionCreateWithoutDossiersInputObjectSchema),
          z.lazy(
            () =>
              SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            SocieteProductionCreateOrConnectWithoutDossiersInputObjectSchema,
        )
        .optional(),
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();

export const SocieteProductionCreateNestedOneWithoutDossiersInputObjectSchema =
  Schema;
