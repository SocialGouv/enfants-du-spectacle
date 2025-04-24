import { z } from 'zod';
import { UserCreateWithoutDossiersInputObjectSchema } from './UserCreateWithoutDossiersInput.schema';
import { UserUncheckedCreateWithoutDossiersInputObjectSchema } from './UserUncheckedCreateWithoutDossiersInput.schema';
import { UserCreateOrConnectWithoutDossiersInputObjectSchema } from './UserCreateOrConnectWithoutDossiersInput.schema';
import { UserUpsertWithoutDossiersInputObjectSchema } from './UserUpsertWithoutDossiersInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDossiersInputObjectSchema } from './UserUpdateWithoutDossiersInput.schema';
import { UserUncheckedUpdateWithoutDossiersInputObjectSchema } from './UserUncheckedUpdateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDossiersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDossiersInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutDossiersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutDossiersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutDossiersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutDossiersInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutDossiersInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutDossiersNestedInputObjectSchema =
  Schema;
