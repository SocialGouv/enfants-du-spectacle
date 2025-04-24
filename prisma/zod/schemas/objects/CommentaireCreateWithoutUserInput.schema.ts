import { z } from 'zod';
import { DossierCreateNestedOneWithoutCommentairesInputObjectSchema } from './DossierCreateNestedOneWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateWithoutUserInput> = z
  .object({
    text: z.string(),
    date: z.coerce.date(),
    seen: z.boolean().optional().nullable(),
    dossier: z
      .lazy(() => DossierCreateNestedOneWithoutCommentairesInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentaireCreateWithoutUserInputObjectSchema = Schema;
