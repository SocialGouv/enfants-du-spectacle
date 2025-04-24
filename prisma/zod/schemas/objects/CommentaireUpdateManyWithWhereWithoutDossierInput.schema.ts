import { z } from 'zod';
import { CommentaireScalarWhereInputObjectSchema } from './CommentaireScalarWhereInput.schema';
import { CommentaireUpdateManyMutationInputObjectSchema } from './CommentaireUpdateManyMutationInput.schema';
import { CommentaireUncheckedUpdateManyWithoutCommentairesInputObjectSchema } from './CommentaireUncheckedUpdateManyWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateManyWithWhereWithoutDossierInput> =
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

export const CommentaireUpdateManyWithWhereWithoutDossierInputObjectSchema =
  Schema;
