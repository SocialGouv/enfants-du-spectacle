import { z } from 'zod';
import { UserCreateWithoutEnfantInputObjectSchema } from './UserCreateWithoutEnfantInput.schema';
import { UserUncheckedCreateWithoutEnfantInputObjectSchema } from './UserUncheckedCreateWithoutEnfantInput.schema';
import { UserCreateOrConnectWithoutEnfantInputObjectSchema } from './UserCreateOrConnectWithoutEnfantInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutEnfantInput> = z
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
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutEnfantInputObjectSchema = Schema;
