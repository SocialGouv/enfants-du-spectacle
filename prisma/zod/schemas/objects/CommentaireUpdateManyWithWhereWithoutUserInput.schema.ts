import { z } from 'zod';
import { CommentaireScalarWhereInputObjectSchema } from './CommentaireScalarWhereInput.schema';
import { CommentaireUpdateManyMutationInputObjectSchema } from './CommentaireUpdateManyMutationInput.schema';
import { CommentaireUncheckedUpdateManyWithoutCommentairesInputObjectSchema } from './CommentaireUncheckedUpdateManyWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentaireScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentaireUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CommentaireUncheckedUpdateManyWithoutCommentairesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CommentaireUpdateManyWithWhereWithoutUserInputObjectSchema =
  Schema;
