import { z } from 'zod';
import { UserCreateWithoutAccountInputObjectSchema } from './UserCreateWithoutAccountInput.schema';
import { UserUncheckedCreateWithoutAccountInputObjectSchema } from './UserUncheckedCreateWithoutAccountInput.schema';
import { UserCreateOrConnectWithoutAccountInputObjectSchema } from './UserCreateOrConnectWithoutAccountInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutAccountInputObjectSchema = Schema;
