import { z } from 'zod';
import { SocieteProductionCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeursInput.schema';
import { SocieteProductionCreateOrConnectWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDemandeursInput.schema';
import { SocieteProductionUpsertWithoutDemandeursInputObjectSchema } from './SocieteProductionUpsertWithoutDemandeursInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionUpdateWithoutDemandeursInputObjectSchema } from './SocieteProductionUpdateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDemandeursInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpdateOneRequiredWithoutDemandeursNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => SocieteProductionCreateWithoutDemandeursInputObjectSchema,
          ),
          z.lazy(
            () =>
              SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            SocieteProductionCreateOrConnectWithoutDemandeursInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => SocieteProductionUpsertWithoutDemandeursInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SocieteProductionUpdateWithoutDemandeursInputObjectSchema,
          ),
          z.lazy(
            () =>
              SocieteProductionUncheckedUpdateWithoutDemandeursInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const SocieteProductionUpdateOneRequiredWithoutDemandeursNestedInputObjectSchema =
  Schema;
