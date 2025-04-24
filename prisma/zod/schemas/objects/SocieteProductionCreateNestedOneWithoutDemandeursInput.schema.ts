import { z } from 'zod';
import { SocieteProductionCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeursInput.schema';
import { SocieteProductionCreateOrConnectWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateOrConnectWithoutDemandeursInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './SocieteProductionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateNestedOneWithoutDemandeursInput> =
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
      connect: z
        .lazy(() => SocieteProductionWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();

export const SocieteProductionCreateNestedOneWithoutDemandeursInputObjectSchema =
  Schema;
