import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCommentsInputObjectSchema } from './UserCreateWithoutCommentsInput.schema';
import { UserUncheckedCreateWithoutCommentsInputObjectSchema } from './UserUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutCommentsInputObjectSchema = Schema;
