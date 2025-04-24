import { z } from 'zod';
import { CommentsCreateManyParentCommentInputObjectSchema } from './CommentsCreateManyParentCommentInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateManyParentCommentInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CommentsCreateManyParentCommentInputObjectSchema),
      z.lazy(() => CommentsCreateManyParentCommentInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CommentsCreateManyParentCommentInputEnvelopeObjectSchema = Schema;
