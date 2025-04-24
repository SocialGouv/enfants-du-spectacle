import { z } from 'zod';
import { UserCreateWithoutDossiersMedecinInputObjectSchema } from './UserCreateWithoutDossiersMedecinInput.schema';
import { UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedCreateWithoutDossiersMedecinInput.schema';
import { UserCreateOrConnectWithoutDossiersMedecinInputObjectSchema } from './UserCreateOrConnectWithoutDossiersMedecinInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutDossiersMedecinInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDossiersMedecinInputObjectSchema),
          z.lazy(
            () => UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutDossiersMedecinInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutDossiersMedecinInputObjectSchema =
  Schema;
