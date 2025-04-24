import { z } from 'zod';
import { UserUpdateWithoutAccountInputObjectSchema } from './UserUpdateWithoutAccountInput.schema';
import { UserUncheckedUpdateWithoutAccountInputObjectSchema } from './UserUncheckedUpdateWithoutAccountInput.schema';
import { UserCreateWithoutAccountInputObjectSchema } from './UserCreateWithoutAccountInput.schema';
import { UserUncheckedCreateWithoutAccountInputObjectSchema } from './UserUncheckedCreateWithoutAccountInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutAccountInputObjectSchema = Schema;
