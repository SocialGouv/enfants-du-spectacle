import { z } from 'zod';
import { CommentsWhereInputObjectSchema } from './CommentsWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsRelationFilter> = z
  .object({
    is: z
      .lazy(() => CommentsWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CommentsWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const CommentsRelationFilterObjectSchema = Schema;
