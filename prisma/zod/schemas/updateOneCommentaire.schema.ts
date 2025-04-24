import { z } from 'zod';
import { CommentaireUpdateInputObjectSchema } from './objects/CommentaireUpdateInput.schema';
import { CommentaireUncheckedUpdateInputObjectSchema } from './objects/CommentaireUncheckedUpdateInput.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';

export const CommentaireUpdateOneSchema = z.object({
  data: z.union([
    CommentaireUpdateInputObjectSchema,
    CommentaireUncheckedUpdateInputObjectSchema,
  ]),
  where: CommentaireWhereUniqueInputObjectSchema,
});
