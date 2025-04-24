import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';

export const CommentaireDeleteOneSchema = z.object({
  where: CommentaireWhereUniqueInputObjectSchema,
});
