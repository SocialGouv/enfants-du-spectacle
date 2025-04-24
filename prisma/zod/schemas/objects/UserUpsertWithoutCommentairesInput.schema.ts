import { z } from 'zod';
import { UserUpdateWithoutCommentairesInputObjectSchema } from './UserUpdateWithoutCommentairesInput.schema';
import { UserUncheckedUpdateWithoutCommentairesInputObjectSchema } from './UserUncheckedUpdateWithoutCommentairesInput.schema';
import { UserCreateWithoutCommentairesInputObjectSchema } from './UserCreateWithoutCommentairesInput.schema';
import { UserUncheckedCreateWithoutCommentairesInputObjectSchema } from './UserUncheckedCreateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutCommentairesInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutCommentairesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutCommentairesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutCommentairesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutCommentairesInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutCommentairesInputObjectSchema = Schema;
