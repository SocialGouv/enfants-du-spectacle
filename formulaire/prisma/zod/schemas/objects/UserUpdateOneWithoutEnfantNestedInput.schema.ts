import { z } from 'zod';
import { UserCreateWithoutEnfantInputObjectSchema } from './UserCreateWithoutEnfantInput.schema';
import { UserUncheckedCreateWithoutEnfantInputObjectSchema } from './UserUncheckedCreateWithoutEnfantInput.schema';
import { UserCreateOrConnectWithoutEnfantInputObjectSchema } from './UserCreateOrConnectWithoutEnfantInput.schema';
import { UserUpsertWithoutEnfantInputObjectSchema } from './UserUpsertWithoutEnfantInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutEnfantInputObjectSchema } from './UserUpdateWithoutEnfantInput.schema';
import { UserUncheckedUpdateWithoutEnfantInputObjectSchema } from './UserUncheckedUpdateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutEnfantNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutEnfantInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutEnfantInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutEnfantInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutEnfantInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutEnfantInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutEnfantInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneWithoutEnfantNestedInputObjectSchema = Schema;
