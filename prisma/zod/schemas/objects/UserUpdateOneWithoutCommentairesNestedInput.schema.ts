import { z } from 'zod';
import { UserCreateWithoutCommentairesInputObjectSchema } from './UserCreateWithoutCommentairesInput.schema';
import { UserUncheckedCreateWithoutCommentairesInputObjectSchema } from './UserUncheckedCreateWithoutCommentairesInput.schema';
import { UserCreateOrConnectWithoutCommentairesInputObjectSchema } from './UserCreateOrConnectWithoutCommentairesInput.schema';
import { UserUpsertWithoutCommentairesInputObjectSchema } from './UserUpsertWithoutCommentairesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutCommentairesInputObjectSchema } from './UserUpdateWithoutCommentairesInput.schema';
import { UserUncheckedUpdateWithoutCommentairesInputObjectSchema } from './UserUncheckedUpdateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutCommentairesNestedInput> = z
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
    upsert: z
      .lazy(() => UserUpsertWithoutCommentairesInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutCommentairesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommentairesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneWithoutCommentairesNestedInputObjectSchema = Schema;
