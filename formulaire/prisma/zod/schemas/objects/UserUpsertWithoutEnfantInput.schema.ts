import { z } from 'zod';
import { UserUpdateWithoutEnfantInputObjectSchema } from './UserUpdateWithoutEnfantInput.schema';
import { UserUncheckedUpdateWithoutEnfantInputObjectSchema } from './UserUncheckedUpdateWithoutEnfantInput.schema';
import { UserCreateWithoutEnfantInputObjectSchema } from './UserCreateWithoutEnfantInput.schema';
import { UserUncheckedCreateWithoutEnfantInputObjectSchema } from './UserUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutEnfantInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutEnfantInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutEnfantInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutEnfantInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutEnfantInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutEnfantInputObjectSchema = Schema;
