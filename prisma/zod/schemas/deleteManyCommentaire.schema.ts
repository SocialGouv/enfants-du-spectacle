import { z } from 'zod';
import { CommentaireWhereInputObjectSchema } from './objects/CommentaireWhereInput.schema';

export const CommentaireDeleteManySchema = z.object({
  where: CommentaireWhereInputObjectSchema.optional(),
});
