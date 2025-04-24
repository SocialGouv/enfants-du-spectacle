import { z } from 'zod';
import { SocieteProductionCreateWithoutDossiersInputObjectSchema } from './SocieteProductionCreateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDossiersInput.schema';
import { SocieteProductionCreateOrConnectWithoutDossiersInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDossiersInput.schema';
import { SocieteProductionUpsertWithoutDossiersInputObjectSchema } from './SocieteProductionUpsertWithoutDossiersInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionUpdateWithoutDossiersInputObjectSchema } from './SocieteProductionUpdateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpdateOneRequiredWithoutDossiersNestedInput> =
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
      upsert: z
        .lazy(() => SocieteProductionUpsertWithoutDossiersInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(() => SocieteProductionUpdateWithoutDossiersInputObjectSchema),
          z.lazy(
            () =>
              SocieteProductionUncheckedUpdateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const SocieteProductionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema =
  Schema;
