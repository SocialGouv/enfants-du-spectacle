import { z } from 'zod';
import { UserCreateWithoutDossiersInputObjectSchema } from './UserCreateWithoutDossiersInput.schema';
import { UserUncheckedCreateWithoutDossiersInputObjectSchema } from './UserUncheckedCreateWithoutDossiersInput.schema';
import { UserCreateOrConnectWithoutDossiersInputObjectSchema } from './UserCreateOrConnectWithoutDossiersInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutDossiersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutDossiersInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutDossiersInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutDossiersInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutDossiersInputObjectSchema = Schema;
