import { z } from 'zod';
import { UserCreateWithoutSendListInputObjectSchema } from './UserCreateWithoutSendListInput.schema';
import { UserUncheckedCreateWithoutSendListInputObjectSchema } from './UserUncheckedCreateWithoutSendListInput.schema';
import { UserCreateOrConnectWithoutSendListInputObjectSchema } from './UserCreateOrConnectWithoutSendListInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutSendListInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSendListInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutSendListInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSendListInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutSendListInputObjectSchema = Schema;
