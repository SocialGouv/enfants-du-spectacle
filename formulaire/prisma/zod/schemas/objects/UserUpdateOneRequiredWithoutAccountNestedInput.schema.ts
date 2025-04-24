import { z } from 'zod';
import { UserCreateWithoutAccountInputObjectSchema } from './UserCreateWithoutAccountInput.schema';
import { UserUncheckedCreateWithoutAccountInputObjectSchema } from './UserUncheckedCreateWithoutAccountInput.schema';
import { UserCreateOrConnectWithoutAccountInputObjectSchema } from './UserCreateOrConnectWithoutAccountInput.schema';
import { UserUpsertWithoutAccountInputObjectSchema } from './UserUpsertWithoutAccountInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutAccountInputObjectSchema } from './UserUpdateWithoutAccountInput.schema';
import { UserUncheckedUpdateWithoutAccountInputObjectSchema } from './UserUncheckedUpdateWithoutAccountInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutAccountInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutAccountInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutAccountNestedInputObjectSchema =
  Schema;
