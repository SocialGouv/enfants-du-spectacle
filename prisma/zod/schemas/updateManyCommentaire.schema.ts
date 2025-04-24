import { z } from 'zod';
import { CommentaireUpdateManyMutationInputObjectSchema } from './objects/CommentaireUpdateManyMutationInput.schema';
import { CommentaireWhereInputObjectSchema } from './objects/CommentaireWhereInput.schema';

export const CommentaireUpdateManySchema = z.object({
  data: CommentaireUpdateManyMutationInputObjectSchema,
  where: CommentaireWhereInputObjectSchema.optional(),
});
