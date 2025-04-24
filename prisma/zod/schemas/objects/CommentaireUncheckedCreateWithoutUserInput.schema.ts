import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    text: z.string(),
    date: z.coerce.date(),
    dossierId: z.number(),
    seen: z.boolean().optional().nullable(),
  })
  .strict();

export const CommentaireUncheckedCreateWithoutUserInputObjectSchema = Schema;
