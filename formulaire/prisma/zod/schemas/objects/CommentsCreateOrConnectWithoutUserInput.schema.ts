import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsCreateWithoutUserInputObjectSchema } from './CommentsCreateWithoutUserInput.schema';
import { CommentsUncheckedCreateWithoutUserInputObjectSchema } from './CommentsUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CommentsCreateWithoutUserInputObjectSchema),
      z.lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const CommentsCreateOrConnectWithoutUserInputObjectSchema = Schema;
