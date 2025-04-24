import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutUserInputObjectSchema } from './CommentsUpdateWithoutUserInput.schema';
import { CommentsUncheckedUpdateWithoutUserInputObjectSchema } from './CommentsUncheckedUpdateWithoutUserInput.schema';
import { CommentsCreateWithoutUserInputObjectSchema } from './CommentsCreateWithoutUserInput.schema';
import { CommentsUncheckedCreateWithoutUserInputObjectSchema } from './CommentsUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentsUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentsCreateWithoutUserInputObjectSchema),
        z.lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
