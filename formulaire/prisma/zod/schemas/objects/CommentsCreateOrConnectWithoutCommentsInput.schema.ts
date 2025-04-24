import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsCreateWithoutCommentsInputObjectSchema } from './CommentsCreateWithoutCommentsInput.schema';
import { CommentsUncheckedCreateWithoutCommentsInputObjectSchema } from './CommentsUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutCommentsInput> = z
  .object({
    where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CommentsCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => CommentsUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const CommentsCreateOrConnectWithoutCommentsInputObjectSchema = Schema;
