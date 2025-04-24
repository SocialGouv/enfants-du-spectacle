import { z } from 'zod';
import { CommentaireCreateManyInputObjectSchema } from './objects/CommentaireCreateManyInput.schema';

export const CommentaireCreateManySchema = z.object({
  data: z.union([
    CommentaireCreateManyInputObjectSchema,
    z.array(CommentaireCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
