import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAccountInputObjectSchema } from './UserCreateWithoutAccountInput.schema';
import { UserUncheckedCreateWithoutAccountInputObjectSchema } from './UserUncheckedCreateWithoutAccountInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutAccountInputObjectSchema = Schema;
