import { z } from 'zod';
import { UserCreateWithoutSendListInputObjectSchema } from './UserCreateWithoutSendListInput.schema';
import { UserUncheckedCreateWithoutSendListInputObjectSchema } from './UserUncheckedCreateWithoutSendListInput.schema';
import { UserCreateOrConnectWithoutSendListInputObjectSchema } from './UserCreateOrConnectWithoutSendListInput.schema';
import { UserUpsertWithoutSendListInputObjectSchema } from './UserUpsertWithoutSendListInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutSendListInputObjectSchema } from './UserUpdateWithoutSendListInput.schema';
import { UserUncheckedUpdateWithoutSendListInputObjectSchema } from './UserUncheckedUpdateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSendListNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSendListInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutSendListInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSendListInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutSendListInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutSendListInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSendListInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSendListNestedInputObjectSchema =
  Schema;
