import { z } from 'zod';
import { CommentaireCreateInputObjectSchema } from './objects/CommentaireCreateInput.schema';
import { CommentaireUncheckedCreateInputObjectSchema } from './objects/CommentaireUncheckedCreateInput.schema';

export const CommentaireCreateOneSchema = z.object({
  data: z.union([
    CommentaireCreateInputObjectSchema,
    CommentaireUncheckedCreateInputObjectSchema,
  ]),
});
