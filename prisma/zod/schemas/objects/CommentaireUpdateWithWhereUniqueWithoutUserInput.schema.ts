import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithoutUserInputObjectSchema } from './CommentaireUpdateWithoutUserInput.schema';
import { CommentaireUncheckedUpdateWithoutUserInputObjectSchema } from './CommentaireUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentaireUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CommentaireUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const CommentaireUpdateWithWhereUniqueWithoutUserInputObjectSchema =
  Schema;
