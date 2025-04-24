import { z } from 'zod';
import { UserUpdateWithoutDossiersMedecinInputObjectSchema } from './UserUpdateWithoutDossiersMedecinInput.schema';
import { UserUncheckedUpdateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedUpdateWithoutDossiersMedecinInput.schema';
import { UserCreateWithoutDossiersMedecinInputObjectSchema } from './UserCreateWithoutDossiersMedecinInput.schema';
import { UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema } from './UserUncheckedCreateWithoutDossiersMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutDossiersMedecinInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutDossiersMedecinInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutDossiersMedecinInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutDossiersMedecinInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutDossiersMedecinInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutDossiersMedecinInputObjectSchema = Schema;
