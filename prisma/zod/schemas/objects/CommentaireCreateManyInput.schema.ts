import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateManyInput> = z
  .object({
    id: z.number().optional(),
    text: z.string(),
    date: z.coerce.date(),
    userId: z.number(),
    dossierId: z.number(),
    seen: z.boolean().optional().nullable(),
  })
  .strict();

export const CommentaireCreateManyInputObjectSchema = Schema;
