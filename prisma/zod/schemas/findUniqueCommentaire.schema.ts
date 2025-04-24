import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';

export const CommentaireFindUniqueSchema = z.object({
  where: CommentaireWhereUniqueInputObjectSchema,
});
