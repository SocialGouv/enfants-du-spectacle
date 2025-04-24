import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutDossiersMedecinInputObjectSchema } from './UserCreateWithoutDossiersMedecinInput.schema';
import { UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedCreateWithoutDossiersMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutDossiersMedecinInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutDossiersMedecinInputObjectSchema),
        z.lazy(
          () => UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const UserCreateOrConnectWithoutDossiersMedecinInputObjectSchema =
  Schema;
