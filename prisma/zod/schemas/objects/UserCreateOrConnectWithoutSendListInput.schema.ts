import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutSendListInputObjectSchema } from './UserCreateWithoutSendListInput.schema';
import { UserUncheckedCreateWithoutSendListInputObjectSchema } from './UserUncheckedCreateWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutSendListInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutSendListInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutSendListInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutSendListInputObjectSchema = Schema;
