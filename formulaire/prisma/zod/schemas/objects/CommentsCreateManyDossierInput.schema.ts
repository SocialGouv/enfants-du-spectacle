import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateManyDossierInput> = z
  .object({
    id: z.number().optional(),
    text: z.string(),
    source: z.lazy(() => SourcecommentSchema),
    enfantId: z.number().optional().nullable(),
    commentsId: z.number().optional().nullable(),
    userId: z.number().optional().nullable(),
    externalUserId: z.number().optional().nullable(),
    sender: z.string().optional().nullable(),
    seen: z.boolean().optional().nullable(),
    date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const CommentsCreateManyDossierInputObjectSchema = Schema;
