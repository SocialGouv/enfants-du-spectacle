import { z } from 'zod';
import { UserCreateNestedOneWithoutCommentairesInputObjectSchema } from './UserCreateNestedOneWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateWithoutDossierInput> = z
  .object({
    text: z.string(),
    date: z.coerce.date(),
    seen: z.boolean().optional().nullable(),
    user: z
      .lazy(() => UserCreateNestedOneWithoutCommentairesInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentaireCreateWithoutDossierInputObjectSchema = Schema;
