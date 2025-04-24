import { z } from 'zod';
import { UserCreateNestedOneWithoutCommentairesInputObjectSchema } from './UserCreateNestedOneWithoutCommentairesInput.schema';
import { DossierCreateNestedOneWithoutCommentairesInputObjectSchema } from './DossierCreateNestedOneWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateInput> = z
  .object({
    text: z.string(),
    date: z.coerce.date(),
    seen: z.boolean().optional().nullable(),
    user: z
      .lazy(() => UserCreateNestedOneWithoutCommentairesInputObjectSchema)
      .optional(),
    dossier: z
      .lazy(() => DossierCreateNestedOneWithoutCommentairesInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentaireCreateInputObjectSchema = Schema;
