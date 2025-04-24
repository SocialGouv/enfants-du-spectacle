import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutUserInputObjectSchema } from './CommentsUpdateWithoutUserInput.schema';
import { CommentsUncheckedUpdateWithoutUserInputObjectSchema } from './CommentsUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentsUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
