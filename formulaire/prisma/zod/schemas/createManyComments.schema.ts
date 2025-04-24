import { z } from 'zod';
import { CommentsCreateManyInputObjectSchema } from './objects/CommentsCreateManyInput.schema';

export const CommentsCreateManySchema = z.object({
  data: z.union([
    CommentsCreateManyInputObjectSchema,
    z.array(CommentsCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
