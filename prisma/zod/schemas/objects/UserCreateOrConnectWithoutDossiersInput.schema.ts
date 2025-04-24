import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutDossiersInputObjectSchema } from './UserCreateWithoutDossiersInput.schema';
import { UserUncheckedCreateWithoutDossiersInputObjectSchema } from './UserUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutDossiersInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutDossiersInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutDossiersInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutDossiersInputObjectSchema = Schema;
