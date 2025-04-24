import { z } from 'zod';
import { UserUpdateWithoutCommentsInputObjectSchema } from './UserUpdateWithoutCommentsInput.schema';
import { UserUncheckedUpdateWithoutCommentsInputObjectSchema } from './UserUncheckedUpdateWithoutCommentsInput.schema';
import { UserCreateWithoutCommentsInputObjectSchema } from './UserCreateWithoutCommentsInput.schema';
import { UserUncheckedCreateWithoutCommentsInputObjectSchema } from './UserUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutCommentsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCommentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutCommentsInputObjectSchema = Schema;
