import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutEnfantInputObjectSchema } from './UserCreateWithoutEnfantInput.schema';
import { UserUncheckedCreateWithoutEnfantInputObjectSchema } from './UserUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutEnfantInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutEnfantInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutEnfantInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutEnfantInputObjectSchema = Schema;
