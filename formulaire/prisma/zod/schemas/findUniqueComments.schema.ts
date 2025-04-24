import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';

export const CommentsFindUniqueSchema = z.object({
  where: CommentsWhereUniqueInputObjectSchema,
});
