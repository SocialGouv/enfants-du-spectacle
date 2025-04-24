import { z } from 'zod';
import { CommentaireWhereInputObjectSchema } from './CommentaireWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireListRelationFilter> = z
  .object({
    every: z.lazy(() => CommentaireWhereInputObjectSchema).optional(),
    some: z.lazy(() => CommentaireWhereInputObjectSchema).optional(),
    none: z.lazy(() => CommentaireWhereInputObjectSchema).optional(),
  })
  .strict();

export const CommentaireListRelationFilterObjectSchema = Schema;
