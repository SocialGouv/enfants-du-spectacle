import { z } from 'zod';
import { CommentsWhereInputObjectSchema } from './objects/CommentsWhereInput.schema';

export const CommentsDeleteManySchema = z.object({
  where: CommentsWhereInputObjectSchema.optional(),
});
