import { z } from 'zod';
import { UserUpdateWithoutSendListInputObjectSchema } from './UserUpdateWithoutSendListInput.schema';
import { UserUncheckedUpdateWithoutSendListInputObjectSchema } from './UserUncheckedUpdateWithoutSendListInput.schema';
import { UserCreateWithoutSendListInputObjectSchema } from './UserCreateWithoutSendListInput.schema';
import { UserUncheckedCreateWithoutSendListInputObjectSchema } from './UserUncheckedCreateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutSendListInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSendListInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSendListInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSendListInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutSendListInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutSendListInputObjectSchema = Schema;
