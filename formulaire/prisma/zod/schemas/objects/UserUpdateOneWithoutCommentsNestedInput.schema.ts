import { z } from 'zod';
import { UserCreateWithoutCommentsInputObjectSchema } from './UserCreateWithoutCommentsInput.schema';
import { UserUncheckedCreateWithoutCommentsInputObjectSchema } from './UserUncheckedCreateWithoutCommentsInput.schema';
import { UserCreateOrConnectWithoutCommentsInputObjectSchema } from './UserCreateOrConnectWithoutCommentsInput.schema';
import { UserUpsertWithoutCommentsInputObjectSchema } from './UserUpsertWithoutCommentsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutCommentsInputObjectSchema } from './UserUpdateWithoutCommentsInput.schema';
import { UserUncheckedUpdateWithoutCommentsInputObjectSchema } from './UserUncheckedUpdateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutCommentsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCommentsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutCommentsInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutCommentsInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutCommentsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneWithoutCommentsNestedInputObjectSchema = Schema;
