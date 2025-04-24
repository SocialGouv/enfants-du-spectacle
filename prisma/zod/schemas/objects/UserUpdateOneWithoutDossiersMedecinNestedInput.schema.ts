import { z } from 'zod';
import { UserCreateWithoutDossiersMedecinInputObjectSchema } from './UserCreateWithoutDossiersMedecinInput.schema';
import { UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedCreateWithoutDossiersMedecinInput.schema';
import { UserCreateOrConnectWithoutDossiersMedecinInputObjectSchema } from './UserCreateOrConnectWithoutDossiersMedecinInput.schema';
import { UserUpsertWithoutDossiersMedecinInputObjectSchema } from './UserUpsertWithoutDossiersMedecinInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDossiersMedecinInputObjectSchema } from './UserUpdateWithoutDossiersMedecinInput.schema';
import { UserUncheckedUpdateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedUpdateWithoutDossiersMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutDossiersMedecinNestedInput> =
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
      upsert: z
        .lazy(() => UserUpsertWithoutDossiersMedecinInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutDossiersMedecinInputObjectSchema),
          z.lazy(
            () => UserUncheckedUpdateWithoutDossiersMedecinInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneWithoutDossiersMedecinNestedInputObjectSchema =
  Schema;
