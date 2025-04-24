import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithoutUserInputObjectSchema } from './CommentaireUpdateWithoutUserInput.schema';
import { CommentaireUncheckedUpdateWithoutUserInputObjectSchema } from './CommentaireUncheckedUpdateWithoutUserInput.schema';
import { CommentaireCreateWithoutUserInputObjectSchema } from './CommentaireCreateWithoutUserInput.schema';
import { CommentaireUncheckedCreateWithoutUserInputObjectSchema } from './CommentaireUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentaireUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CommentaireUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema),
        z.lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const CommentaireUpsertWithWhereUniqueWithoutUserInputObjectSchema =
  Schema;
