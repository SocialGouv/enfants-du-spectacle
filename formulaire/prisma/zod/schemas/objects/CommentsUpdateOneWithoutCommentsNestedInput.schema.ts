import { z } from 'zod';
import { CommentsCreateWithoutCommentsInputObjectSchema } from './CommentsCreateWithoutCommentsInput.schema';
import { CommentsUncheckedCreateWithoutCommentsInputObjectSchema } from './CommentsUncheckedCreateWithoutCommentsInput.schema';
import { CommentsCreateOrConnectWithoutCommentsInputObjectSchema } from './CommentsCreateOrConnectWithoutCommentsInput.schema';
import { CommentsUpsertWithoutCommentsInputObjectSchema } from './CommentsUpsertWithoutCommentsInput.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutCommentsInputObjectSchema } from './CommentsUpdateWithoutCommentsInput.schema';
import { CommentsUncheckedUpdateWithoutCommentsInputObjectSchema } from './CommentsUncheckedUpdateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateOneWithoutCommentsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CommentsCreateWithoutCommentsInputObjectSchema),
        z.lazy(() => CommentsUncheckedCreateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CommentsCreateOrConnectWithoutCommentsInputObjectSchema)
      .optional(),
    upsert: z
      .lazy(() => CommentsUpsertWithoutCommentsInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => CommentsWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => CommentsUpdateWithoutCommentsInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const CommentsUpdateOneWithoutCommentsNestedInputObjectSchema = Schema;
