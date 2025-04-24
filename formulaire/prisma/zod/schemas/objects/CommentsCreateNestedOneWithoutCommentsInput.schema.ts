import { z } from 'zod';
import { CommentsCreateWithoutCommentsInputObjectSchema } from './CommentsCreateWithoutCommentsInput.schema';
import { CommentsUncheckedCreateWithoutCommentsInputObjectSchema } from './CommentsUncheckedCreateWithoutCommentsInput.schema';
import { CommentsCreateOrConnectWithoutCommentsInputObjectSchema } from './CommentsCreateOrConnectWithoutCommentsInput.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateNestedOneWithoutCommentsInput> = z
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
    connect: z.lazy(() => CommentsWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const CommentsCreateNestedOneWithoutCommentsInputObjectSchema = Schema;
