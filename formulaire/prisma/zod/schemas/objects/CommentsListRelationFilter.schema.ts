import { z } from 'zod';
import { CommentsWhereInputObjectSchema } from './CommentsWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsListRelationFilter> = z
  .object({
    every: z.lazy(() => CommentsWhereInputObjectSchema).optional(),
    some: z.lazy(() => CommentsWhereInputObjectSchema).optional(),
    none: z.lazy(() => CommentsWhereInputObjectSchema).optional(),
  })
  .strict();

export const CommentsListRelationFilterObjectSchema = Schema;
