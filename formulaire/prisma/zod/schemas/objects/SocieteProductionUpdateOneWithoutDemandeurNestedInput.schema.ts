import { z } from 'zod';
import { SocieteProductionCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeurInput.schema';
import { SocieteProductionCreateOrConnectWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDemandeurInput.schema';
import { SocieteProductionUpsertWithoutDemandeurInputObjectSchema } from './SocieteProductionUpsertWithoutDemandeurInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionUpdateWithoutDemandeurInputObjectSchema } from './SocieteProductionUpdateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpdateOneWithoutDemandeurNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => SocieteProductionCreateWithoutDemandeurInputObjectSchema,
          ),
          z.lazy(
            () =>
              SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            SocieteProductionCreateOrConnectWithoutDemandeurInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => SocieteProductionUpsertWithoutDemandeurInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SocieteProductionUpdateWithoutDemandeurInputObjectSchema,
          ),
          z.lazy(
            () =>
              SocieteProductionUncheckedUpdateWithoutDemandeurInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const SocieteProductionUpdateOneWithoutDemandeurNestedInputObjectSchema =
  Schema;
