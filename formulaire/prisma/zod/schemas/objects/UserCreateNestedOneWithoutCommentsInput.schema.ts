import { z } from 'zod';
import { UserCreateWithoutCommentsInputObjectSchema } from './UserCreateWithoutCommentsInput.schema';
import { UserUncheckedCreateWithoutCommentsInputObjectSchema } from './UserUncheckedCreateWithoutCommentsInput.schema';
import { UserCreateOrConnectWithoutCommentsInputObjectSchema } from './UserCreateOrConnectWithoutCommentsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCommentsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutCommentsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutCommentsInputObjectSchema = Schema;
