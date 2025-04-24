import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireCreateWithoutUserInputObjectSchema } from './CommentaireCreateWithoutUserInput.schema';
import { CommentaireUncheckedCreateWithoutUserInputObjectSchema } from './CommentaireUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema),
      z.lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const CommentaireCreateOrConnectWithoutUserInputObjectSchema = Schema;
