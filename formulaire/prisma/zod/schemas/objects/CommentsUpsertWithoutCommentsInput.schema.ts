import { z } from 'zod';
import { CommentsUpdateWithoutCommentsInputObjectSchema } from './CommentsUpdateWithoutCommentsInput.schema';
import { CommentsUncheckedUpdateWithoutCommentsInputObjectSchema } from './CommentsUncheckedUpdateWithoutCommentsInput.schema';
import { CommentsCreateWithoutCommentsInputObjectSchema } from './CommentsCreateWithoutCommentsInput.schema';
import { CommentsUncheckedCreateWithoutCommentsInputObjectSchema } from './CommentsUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpsertWithoutCommentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => CommentsUpdateWithoutCommentsInputObjectSchema),
      z.lazy(() => CommentsUncheckedUpdateWithoutCommentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CommentsCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => CommentsUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const CommentsUpsertWithoutCommentsInputObjectSchema = Schema;
