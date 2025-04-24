import { z } from 'zod';
import { UserCreateWithoutCommentairesInputObjectSchema } from './UserCreateWithoutCommentairesInput.schema';
import { UserUncheckedCreateWithoutCommentairesInputObjectSchema } from './UserUncheckedCreateWithoutCommentairesInput.schema';
import { UserCreateOrConnectWithoutCommentairesInputObjectSchema } from './UserCreateOrConnectWithoutCommentairesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentairesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutCommentairesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentairesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutCommentairesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutCommentairesInputObjectSchema = Schema;
