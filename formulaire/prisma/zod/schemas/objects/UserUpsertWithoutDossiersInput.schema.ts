import { z } from 'zod';
import { UserUpdateWithoutDossiersInputObjectSchema } from './UserUpdateWithoutDossiersInput.schema';
import { UserUncheckedUpdateWithoutDossiersInputObjectSchema } from './UserUncheckedUpdateWithoutDossiersInput.schema';
import { UserCreateWithoutDossiersInputObjectSchema } from './UserCreateWithoutDossiersInput.schema';
import { UserUncheckedCreateWithoutDossiersInputObjectSchema } from './UserUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutDossiersInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutDossiersInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutDossiersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutDossiersInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutDossiersInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutDossiersInputObjectSchema = Schema;
