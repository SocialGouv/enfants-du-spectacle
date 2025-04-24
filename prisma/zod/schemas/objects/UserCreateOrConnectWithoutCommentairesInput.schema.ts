import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCommentairesInputObjectSchema } from './UserCreateWithoutCommentairesInput.schema';
import { UserUncheckedCreateWithoutCommentairesInputObjectSchema } from './UserUncheckedCreateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentairesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentairesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentairesInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutCommentairesInputObjectSchema = Schema;
